const {User, PostImagen, Post, Tag, Comment} = require('../db');
const bcrypt = require('bcrypt');


const getUsers = async(req, res) => {
  const data = await User.findAll({
    attributes: {exclude: ["password"]}
  })
  res.status(200).json(data)
}

const getUserById = async (req,res) => {
  const data = await User.findByPk(req.params.id, {
    attributes: {exclude: ["password"]}
  });
  res.status(200).json(data);
};



const createUser = async (req, res) => {
  const {username, email, password} = req.body

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({username, email, password: hashedPassword})
  res.status(201).json(newUser)
};


const updateUser = async (req, res) =>{
  const id = req.params.id
  
  
  let {username, email, password} = req.body;
  if (password) {
    password = await bcrypt.hash(password, 10);
  }
  const data = { username, email, password};

  const user = await User.findByPk(id)

  await user.update(data)
  res.status(200).json(user)
}


const deleteUser = async (req, res) =>{
  const id = await req.params.id
  const user = await User.findByPk(id)
  const removed = await user.destroy();
  
  res.status(200).json(removed); 
}


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


const getCommentsByUser = async(req, res) => {
  const id = req.params.id
  let comments = await Comment.findAll({
    where: {usuarioId: id},
    include: {model: Post, as: "post", attributes: ["texto"]},
    order: [["createdAt", "DESC" ]],
    attributes: {exclude: ["updatedAt"]}
  })

  comments = comments.filter(c => c.visible)

  res.status(200).json(comments)
}



const followUser = async (req, res)=>{
  const user = await User.findByPk(req.params.id)
  const userASeguir = await User.findByPk(req.params.idASeguir)
  await user.addSeguido(userASeguir)
  res.status(201).json({message: `${user.username} siguió a ${userASeguir.username}`});
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