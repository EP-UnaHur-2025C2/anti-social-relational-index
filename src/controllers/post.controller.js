const {Post} = require("../db/models")

const getPosts = async (req, res) => {
    const data = await Post.findAll({})
    res.status(200).json(data)
}

const getPostById = async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    res.status(200).json(post)
}

const createPost = async(req, res) => {
    const data = req.body
    const newPost = await Post.create(data)
    res.status(201).json(newPost)
}

const updatePost = async(req, res) => {
    const id = req.params.id
    const data = req.body
    const post = await Post.findByPk(id)

    await post.update(data)
}


const detelePost = async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)

    await post.destroy()
}


module.exports = {getPosts, getPostById, createPost, updatePost, detelePost}
