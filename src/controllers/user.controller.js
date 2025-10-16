const {User, PostImagen, Post, Tag, Comment} = require('../db/models');


const getUsers = async(req, res) => {
  const data = await User.findAll({})
  res.status(200).json(data)
}

const getUserById = async (req,res) => {
  const data = await User.findByPk(req.params.id);
  res.status(200).json(data);
};

const createUser = async (req, res) => {
  try{
  const data = req.body
  const newUser = await User.create(data)
  res.status(201).json(newUser)}
  catch(error){
    res.status(400).json({error: error.message})
      }
};

const updateUser = async (req, res) =>{
  try{
  const id = req.params.id
  const data = req.body
  const user = await User.findByPk(id)
  await user.update(data)
  res.status(200).json(user)}
  catch(error){
    res.status(400).json({error: error.message})
      }

}


const deleteUser = async (req, res) =>{
  const id = await req.params.id
  const user = await User.findByPk(id)
  const removed = await user.destroy({where: {
                id: id,
              },
            });
  
  res.status(200).json(removed); //lo que eliminó. O: res.status(204).send() y no muestra nada
}

// get --> /:id/posts
const getPostsByUser = async(req, res) => {
  const id = req.params.id
  const posts = await Post.findAll({
    where: {usuarioId: id},
    include: [
      {model: PostImagen, as: "imagenes"},
      {model: Tag, as: "tags"},
      {model: User, as:"usuario", attributes: ["username"]}
    ],
    order: [["createdAt", "DESC"]]
  })
  res.status(200).json(posts)
}

//get --> /:id/comments
const getCommentsByUser = async(req, res) => {
  const id = req.params.id
  let comments = await Comment.findAll({
    where: {usuarioId: id}, //solo muestra los visibles
    include: {model: Post, as: "post", attributes: ["texto"]},
    order: [["createdAt", "DESC" ]]
  })

  comments = comments.filter(c => c.visible)

  res.status(200).json(comments)
}



const followUser = async (req, res)=>{
  try{
  const user = await User.findByPk(req.params.id)
  const userASeguir = await User.findByPk(req.params.idASeguir)
  await user.addSeguido(userASeguir)
  res.status(201).json({message: `${user.username} siguió a ${userASeguir.username}`});
  } catch (e) {
        
        res.status(400).json({ error: 'hay un error' });
      }
}



const unfollowUser = async(req, res) => {
  const idSeguidor = req.params.id
  const idSeguido = req.params.idSeguido

  const seguidor = await User.findByPk(idSeguidor)
  const seguido = await User.findByPk(idSeguido)

  await seguidor.removeSeguido(seguido)
  res.status(200).json({message: `${seguidor.username} dejó de seguir a ${seguido.username}`})
}

const getSeguidos = async(req, res) => {
  const id = req.params.id
  const user = await User.findByPk(id)
  const seguidosRaw = await user.getSeguidos({attributes: ["id", "username"],
    through: { attributes: ['createdAt'] }
  });

  const seguidos = seguidosRaw.map(s => ({
    id: s.id,
    username: s.username,
    followedAt: (s.UsuarioSeguidor && s.UsuarioSeguidor.createdAt) ? s.UsuarioSeguidor.createdAt : null
  }));

  res.status(200).json(seguidos)
} 

const getSeguidores = async(req, res) => {
  const id = req.params.id
  const user = await User.findByPk(id)
  // traer también la fecha de la relación (createdAt en la tabla intermedia UsuarioSeguidor)
  const seguidoresRaw = await user.getSeguidores({
    attributes: ["id", "username"],
    through: { attributes: ['createdAt'] }
  });

  
  const seguidores = seguidoresRaw.map(s => ({
    id: s.id,
    username: s.username,
    followedAt: (s.UsuarioSeguidor && s.UsuarioSeguidor.createdAt) ? s.UsuarioSeguidor.createdAt : null
  }));

  res.status(200).json(seguidores)
}

const getCantSeguidores = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  const count = await user.countSeguidores();
  res.status(200).json({ count });
};

const getCantSeguidos = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  const count = await user.countSeguidos();
  res.status(200).json({ count });
}



module.exports = {getUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser,
  getPostsByUser,
  getCommentsByUser,
  followUser, 
  unfollowUser,
  getSeguidos,
  getSeguidores,
  getCantSeguidores,
  getCantSeguidos};