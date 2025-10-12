const { where, or } = require("sequelize")
const {Post, PostImagen, Tag, Comentario, Usuario} = require("../db/models")
const { Op } = require("sequelize")

// try / catch ; ver middlewares

//app.use("/post")

const includePostCompleto = [
    {model: Usuario, as: "usuario", attributes: ["id", "username"]},
    {model: PostImagen, as:"imagenes"},
    {model: Tag, as: "tags"},
    {
        model: Comentario,
        as: "comentarios",
        include: {model: Usuario, as: "usuario", attributes: ["id", "username"]}
    }
]

const getPostCompletoById = async(id) => {
    return await Post.findByPk(id, {
        include: includePostCompleto,
        order: [[{model: Comentario, as: "comentarios"}, "createdAt", "ASC"]]
    })
}

const getPostsCompletos = async() => {
    return await Post.findAll({
        include: includePostCompleto,
        order: [["createdAt", "DESC"]]
    })
}

//get --> /
const getPosts = async (req, res) => {
    const posts = await getPostsCompletos()
    res.status(200).json(posts)
}

//get --> /:id
const getPostById = async(req, res) => {
    const id = req.params.id
    const post = await getPostCompletoById(id)
    res.status(200).json(post)
}

//post --> /
const createPost = async(req, res) => {
    const data = req.body
    const newPost = await Post.create(data)
    res.status(201).json(newPost)
}

//put --> /:id
const updatePost = async(req, res) => {
    const id = req.params.id
    const data = req.body
    const post = await Post.findByPk(id)

    await post.update(data)
    res.status(200).json(post)
}

//delete --> /:id
const deletePost = async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)

    const removed = await post.destroy()
    res.status(200).json(removed) //lo que eliminó. O: res.status(204).send() y no muestra nada
}

// put -->/:id/imgs (o post)
// ver que onda con la URL porque es unique --> findOrCreate para que no haya duplicados?
const addNewImageToPost = async(req, res) => {
    const idPost = req.params.id
    const url = req.body.url //se manda solo la url por post
    const post = await Post.findByPk(idPost)

    const newImage = await PostImagen.create({ //se crea y asocia
        url, 
        postId: post.id
    })

    const postWithImages = await Post.findByPk(idPost, { //trae el post con las imagenes asociadas
        include: {
            model: PostImagen,
            as: "imagenes"
        }
    })

    res.status(201).json(postWithImages.imagenes) //trae array con todas las imagenes + la nueva (supuestamente)
}

//delete --> /:id/imgs/:idImage
const deleteImageFromPost = async(req, res) => {
    const idPost = req.params.id
    const idImage = req.params.idImage
    const post = await Post.findByPk(idPost)

    const image = await PostImagen.findOne({ //busca la imagen asociada al post
        where: {
            id: idImage,
            postId: idPost
        }
    })

    const removed = await image.destroy()
    res.status(200).json(removed) //lo que eliminó. O: res.status(204).send() y no muestra nada
}

//put --> /:id/tags/:idTag (o post)
const addTagToPost = async(req, res) => {
    const idPost = req.params.id
    const idTag = req.params.idTag
    const post = await Post.findByPk(idPost)
    const tag = await Tag.findByPk(idTag)

    await post.addTag(tag)

    const postWithTags = await Post.findByPk(idPost, { //trae el post con los tags
        include: {model: Tag, as: "tags"}
    })

    res.status(200).json(postWithTags.tags)
}

// delete --> /:id/tags/:idTag
const deleteTagFromPost = async(req, res) => {
    const idPost = req.params.id
    const idTag = req.params.idTag
    const post = await Post.findByPk(idPost)
    const tag = await Tag.findByPk(idTag)

    await post.removeTag(tag)

    const postWithTags = await Post.findByPk(idPost, { //trae el post con los tags
        include: {model: Tag, as: "tags"}
    })
    res.status(200).json(postWithTags.tags) //o solo devolver el tag eliminado?
}

// get --> /tag/:id
const getPostsByTag = async(req, res) => {
    const idTag = req.params.id

    const posts = await Post.findAll({
        include: [
        {
            model: Tag,
            as: "tags",
            where: {id: idTag},
            attributes: [] //no trae datos del tag
        },
        {model: Usuario, as: "usuario", attributes: ["username"]},
        {model: PostImagen, as: "imagenes"} //si no hay imagenes, muestra: []
        ]
    })

    res.status(200).json(posts)
}

// get --> /:id/comments
const getCommentsByPost = async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id, {
        include: {
            model: Comentario,
            as: "comentarios",
            where: {visible: true},
            include: {model: Usuario, as:"usuario", attributes: ["username"]}
        },
        order: [[{model: Comentario, as:"comentarios"}, "createdAt", "ASC"]]
    })
    res.status(200).json(post)
}




// codigo repetido --> ver

//post --> /create-image
const createPostWithImages = async(req, res) => {
    const data = req.body //imagenes: array

    const newPost = await Post.create({
        texto: data.texto, 
        userId: data.userId})


    const promesas = []
    data.imagenes.forEach((img) => {
        promesas.push(PostImagen.findOrCreate({
            where: {url: {[Op.eq]: img.url}},
            defaults: img
        }))
    })

    const result = await Promise.all(promesas)
    const imgs = result.map(([img, creada]) => img)

    await newPost.addPostImages(imgs)

    const postWithImages = await Post.findByPk(newPost.id, {
        include: {model: PostImagen, as: "imagenes"}
    })

    res.status(201).json(postWithImages)
}

// post --> /create-tag
const createPostWithTags = async(req, res) => {
    const data = req.body

    const newPost = await Post.create({
        texto: data.texto, 
        userId: data.userId})
    
    const promesas = []
    data.tags.forEach((tag) => {
        promesas.push(Tag.findOrCreate({
            where: {nombre: {[Op.eq]: tag.nombre}},
            defaults: tag
        }))
    })

    const result = await Promise.all(promesas)
    const tags = result.map(([tag, creado]) => tag)

    await newPost.addTags(tags)

    const postWithTags = await Post.findByPk(newPost.id, {
        include: {model: Tag, as: "tags"}})

    res.status(201).json(postWithTags)
}

//post --> /create-completo
const createPostCompleto = async(req, res) => {
    const data = req.body

    const newPost = await Post.create({
        texto: data.texto, 
        userId: data.userId})
    
    const promesasImgs = []
    data.imagenes.forEach((img) => {
        promesasImgs.push(PostImagen.findOrCreate({
            where: {url: {[Op.eq]: img.url}},
            defaults: img
        }))
    })
    await Promise.all(promesasImgs)

    const promesasTags = []
    data.tags.forEach((tag) => {
        promesasTags.push(Tag.findOrCreate({
            where: {nombre: {[Op.eq]: tag.nombre}},
            defaults: tag
        }))
    })
    const result = await Promise.all(promesasTags)
    const tags = result.map(([tag, creado]) => tag)
    await newPost.addTags(tags)

    const postCompleto = await Post.findByPk(newPost.id, {
        include: [
            {model: PostImagen, as: "imagenes"},
            {model: Tag, as: "tags"}
        ]
    })
    res.status(201).json(postCompleto)
}



module.exports = {getPosts, 
    getPostById, 
    createPost, 
    updatePost, 
    deletePost, 
    addNewImageToPost, 
    deleteImageFromPost, 
    addTagToPost, 
    deleteTagFromPost,
    getPostsByTag,
    getCommentsByPost,
    createPostWithImages,
    createPostWithTags,
    createPostCompleto}
