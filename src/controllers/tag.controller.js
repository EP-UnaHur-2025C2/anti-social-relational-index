const {Tag} = require("../db/models")


//app.use("/tag")
//get --> /
const getTags = async(req, res) => {
    const data = await Tag.findAll({})
    res.status(200).json(data)
}

//get --> /:id
const getTagById = async(req, res) => {
    const id = req.params.id
    const tag = await Tag.findByPk(id)
    res.status(200).json(tag)
}

//post --> /
const createTag = async(req, res) => {
    const data = req.body
    const newTag = await Tag.create(data)
    res.status(201).json(newTag)
}

//put --> /:id
//dejar???
const updateTag = async(req, res) => {
    const id = req.params.id
    const data = req.body
    const tag = await Tag.findByPk(id)

    await tag.update(data)
    res.status(200).json(tag)
}

// delete --> /:id
const deleteTag = async(req, res) => {
    const id = req.params.id
    const tag = await Tag.findByPk(id)
    const removed = await tag.destroy()
    res.status(200).json(removed) //lo que eliminó. O: res.status(204).send() y no muestra nada
}



module.exports = {getTags, getTagById, createTag, updateTag, deleteTag}