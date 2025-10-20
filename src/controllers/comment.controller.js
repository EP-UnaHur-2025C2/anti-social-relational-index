const {Comment, User, Post} = require("../db")


const getComments = async(req, res) => { 
    const data = await Comment.findAll({attributes: {exclude: ["updatedAt"]}})
    res.status(200).json(data)
}



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




const createComment = async(req, res) => {
    const {texto, postId} = req.body 
    const data = {texto, postId, usuarioId: req.user.id} 
    const newComment = await Comment.create(data)
    res.status(201).json(newComment)
}


const updateComment = async(req, res) => {
    const id = req.params.id
    const {texto} = req.body
    const comment = await Comment.findByPk(id)
    await comment.update({texto})
    res.status(200).json(comment)
}


const deleteComment = async(req, res) => {
    const id = req.params.id
    const comment = await Comment.findByPk(id)

    const removed = await comment.destroy()
    res.status(200).json(removed) 
}

module.exports = {getComments, 
    getCommentById, 
    createComment, 
    updateComment, 
    deleteComment}