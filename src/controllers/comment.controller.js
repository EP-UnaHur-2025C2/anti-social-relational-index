const {Comment, User, Post} = require("../db/models")

//app.use("/comment")

//get --> /
//dejar???
const getComments = async(req, res) => { //muestra todos los comentarios (visibles o no)
    const data = await Comment.findAll({attributes: {exclude: ["updatedAt"]}})
    res.status(200).json(data)
}


//get --> /:id
const getCommentById = async(req, res) => {
    const id = req.params.id
    const comment = await Comment.findByPk(id, {
        include:[
            {model: User, as: "usuario", attributes: ["username"]},
            {model: Post, as: "post", attributes: ["texto"]}
        ],
        attributes: {exclude: "updatedAt"} 
    })
    res.status(200).json(comment)
}



//post --> /
const createComment = async(req, res) => {
    const {texto, postId} = req.body //para que no se pueda mandar el usuarioId por body
    const data = {texto, postId, usuarioId: req.user.id} 
    const newComment = await Comment.create(data)
    res.status(201).json(newComment)
}

// put --> /:id
const updateComment = async(req, res) => {
    const id = req.params.id
    const {texto} = req.body
    const comment = await Comment.findByPk(id)
    await comment.update({texto})
    res.status(200).json(comment)
}

// delete --> /:id
const deleteComment = async(req, res) => {
    const id = req.params.id
    const comment = await Comment.findByPk(id)

    const removed = await comment.destroy()
    res.status(200).json(removed) //lo que eliminó. O: res.status(204).send() y no muestra nada
}

module.exports = {getComments, 
    getCommentById, 
    createComment, 
    updateComment, 
    deleteComment}