const {Tag} = require("../db")



const getTags = async(req, res) => {
    const data = await Tag.findAll({})
    res.status(200).json(data)
}


const getTagById = async(req, res) => {
    const id = req.params.id
    const tag = await Tag.findByPk(id)
    res.status(200).json(tag)
}


const createTag = async(req, res) => {
    const {nombre} = req.body
    const newTag = await Tag.create({nombre})
    res.status(201).json(newTag)
}


const updateTag = async(req, res) => {
    const id = req.params.id
    const {nombre} = req.body
    const tag = await Tag.findByPk(id)

    await tag.update({nombre})
    res.status(200).json(tag)
}


const deleteTag = async(req, res) => {
    const id = req.params.id
    const tag = await Tag.findByPk(id)
    const removed = await tag.destroy()
    res.status(200).json(removed) 
}



module.exports = {getTags, getTagById, createTag, updateTag, deleteTag}