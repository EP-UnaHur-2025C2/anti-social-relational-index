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
  const data = req.body
  const newUser = await Usuario.create(data)
  res.status(201).json(newUser)
};

const updateUser = async (req, res) =>{
  const id = req.params.id
  const data = req.body
  const user = await Usuario.findByPk(id)
  await user.update(data)
  res.status(200).json(user)
}


const deleteUser = async (req, res) =>{
  const id = await req.params.id
  const user = await Usuario.findByPk(id)
  const removed = await user.destroy()    
      
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
    where: {usuarioId: id, visible: true}, //solo muestra los visibles
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
  const user = await Usuario.findByPk(id)
  const seguidos = await user.getSeguidos({attributes: ["id", "username"]})

  res.status(200).json(seguidos)
} 

const getSeguidores = async(req, res) => {
  const id = req.params.id
  const user = await Usuario.findByPk(id)
  const seguidores = await user.getSeguidores({attributes: ["id", "username"]})

  res.status(200).json(seguidores)
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
  getSeguidores};