const {Usuario, PostImagen, Post, Tag, Comentario} = require('../db/models');


const getUsers = async(req, res) => {
  const data = await Usuario.findAll({})
  res.status(200).json(data)
}


const getUserById = async (req,res) => {
    const data = await Usuario.findByPk(req.params.id);
    res.status(200).json(data);
};

const createUser = async (req, res) => {
    try {
    
      const newUser = await Usuario.create(req.body);
      res.status(201).json(newUser);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  };

const updateUsername = async (req, res) =>{
    try {
        const idABuscar = await req.params.id
        
        const newUser = await Usuario.update(
            
            { username: req.body.username },
            {
              where: {
                id: idABuscar,
              },
            });
        res.status(201).json({message: "usuario modificado con exito"});
      } catch (e) {
        
        res.status(400).json({ error: e });
      }
}

const updateEmail = async (req, res) =>{
    try {
        const idABuscar = await req.params.id
        
        const newUser = await Usuario.update(
            
            { email: req.body.email },
            {
              where: {
                id: idABuscar,
              },
            });
        res.status(201).json({message: "email modificado con exito"});
      } catch (e) {
        
        res.status(400).json({ error: e });
      }
}

const deleteUser = async (req, res) =>{
        const idABuscar = await req.params.id
        
        const newUser = await Usuario.destroy(
            
            {where: {
                id: idABuscar,
              },
            });
            
            
        res.status(200).json({message: "Usuario eliminado con exito"});
      
}

// get --> /:id/posts
const getPostsByUser = async(req, res) => {
  const id = req.params.id
  const posts = await Post.findAll({
    where: {usuarioId: id},
    include: [
      {model: PostImagen, as: "imagenes"},
      {model: Tag, as: "tags"},
      {model: Usuario, as:"usuario", attributes: ["id", "username"]}
    ],
    order: [["createdAt", "DESC"]]
  })
  res.status(200).json(posts)
}

//get --> /:id/comments
const getCommentsByUser = async(req, res) => {
  const id = req.params.id
  const comments = await Comentario.findAll({
    where: {usuarioId: id},
    include: {model: Post, as: "post", attributes: ["id", "texto"]},
    order: [["createdAt", "DESC" ]]
  })
  res.status(200).json(comments)
}



const followUser = async (req, res)=>{
  const user = await Usuario.findByPk(req.params.id)
  const userASeguir = await Usuario.findByPk(req.params.idASeguir)
  await user.addSeguido(userASeguir)
  res.status(201).json({message: `${user.username} siguió a ${userASeguir.username}`});
}


const unfollowUser = async(req, res) => {
  const idSeguidor = req.params.id
  const idSeguido = req.params.idSeguido

  const seguidor = await Usuario.findByPk(idSeguidor)
  const seguido = await Usuario.findByPk(idSeguido)

  await seguidor.removeSeguido(seguido)
  res.status(200).json({message: `${seguidor.username} dejó de seguir a ${seguido.username}`})
}

const getSeguidos = async(req, res) => {
  const id = req.params.id
  const user = await Usuario.findByPk(id, {
    include: {model: Usuario, as: "seguidos", attributes: ["id", "username"]}
  })

  res.status(200).json(user.seguidos)
} 

const getSeguidores = async(req, res) => {
  const id = req.params.id
  const user = await Usuario.findByPk(id, {
    include: {model: Usuario, as: "seguidores", attributes: ["id", "username"]}
  })

  res.status(200).json(user.seguidores)
}



module.exports = {getUsers, 
  getUserById, 
  createUser, 
  updateUsername, 
  updateEmail, 
  deleteUser,
  getPostsByUser,
  getCommentsByUser,
  followUser, 
  unfollowUser,
  getSeguidos,
  getSeguidores};