const { where, or } = require("sequelize")
const {Post, PostImagen, Tag, Comment, User} = require("../db/models")
const { Op } = require("sequelize")

// try / catch ; ver middlewares

//app.use("/post")

const includePostSinComentarios = [
    {model: User, as: "usuario", attributes: ["id", "username"]},
    {model: PostImagen, as: "imagenes"},
    {model: Tag, as:"tags"}
]

const getPostsSinComentarios = async() => {
    return await Post.findAll({
        include: includePostSinComentarios,
        order: [["createdAt", "DESC"]]
    })
}


const includePostCompleto = [
    ...includePostSinComentarios,
    {
        model: Comment,
        as: "comentarios",
        include: {model: User, as: "usuario", attributes: ["id", "username"]}
    }
]

const getPostCompletoById = async(id) => {
    return await Post.findByPk(id, {
        include: includePostCompleto,
        order: [[{model: Comment, as: "comentarios"}, "createdAt", "ASC"]]
    })
}



//get --> /
const getPosts = async (req, res) => {
    const posts = await getPostsSinComentarios()
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

    const imagenes = await post.getImagenes()

    res.status(201).json(imagenes) //trae array con todas las imagenes + la nueva (supuestamente)
}

//delete --> /:id/imgs/:idImage
const deleteImageFromPost = async(req, res) => {
    const idPost = req.params.id
    const idImagen = req.params.idImagen
    const post = await Post.findByPk(idPost)
    const imagen = await PostImagen.findByPk(idImagen)

    await post.removeImagen(imagen)

    const imagenesRestantes = await post.getImagenes()
    res.status(200).json(imagenesRestantes)
}

//get --> /:id/imagenes
const getImagesByPost = async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    const images = await post.getImagenes()
    res.status(200).json(images)
}





//put --> /:id/tags/:idTag (o post)
const addTagToPost = async(req, res) => {
    const idPost = req.params.id
    const idTag = req.params.idTag
    const post = await Post.findByPk(idPost)
    const tag = await Tag.findByPk(idTag)

    await post.addTag(tag)

    const tags = await post.getTags()

    res.status(200).json(tags)
}

// delete --> /:id/tags/:idTag
const deleteTagFromPost = async(req, res) => {
    const idPost = req.params.id
    const idTag = req.params.idTag
    const post = await Post.findByPk(idPost)
    const tag = await Tag.findByPk(idTag)

    await post.removeTag(tag)

    const postWithTags = await post.getTags()
    res.status(200).json(postWithTags) //o solo devolver el tag eliminado?
}

// get --> /tag/:id
const getPostsByTag = async(req, res) => {
    const idTag = req.params.id

    const posts = await Post.findAll({
        include: [
            ...includePostSinComentarios,
            {
                model: Tag,
                as: "tags",
                where: {id: {[Op.eq]: idTag}},
                attributes: []
            }
        ]
    })

    res.status(200).json(posts)
}

//get --> /:id/tags
const getTagsByPost = async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    const tags = await post.getTags()
    res.status(200).json(tags)
}





// get --> /:id/comments
const getCommentsByPost = async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    const comentarios = await post.getComentarios({
        where: {visible: true},
        include: {model: User, as: "usuario", attributes: ["username"]},
        order: [["createdAt", "ASC"]]
    })
    res.status(200).json(comentarios)
}





// get --> /:id/feed
const getPostsOfFollowedUsers = async(req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id)

    const seguidos = await user.getSeguidos({attributes: ["id"]})
    const idSeguidos = seguidos.map(u => u.id)

    const posts = await Post.findAll({
        where: {usuarioId: {[Op.in]: idSeguidos}},
        include: includePostSinComentarios,
        order: [["createdAt", "DESC"]]
    })
    res.status(200).json(posts)
}





const findOrCreateImages = async(imagenes) => {
    const promesas = []
    imagenes.forEach(img => {
        promesas.push(PostImagen.findOrCreate({
            where: {url: {[Op.eq]: img.url}},
            defaults: img
        }))
    })
    const result = await Promise.all(promesas)
    return result.map(([img, creada]) => img)
}

const findOrCreateTags = async(tags) => {
    const promesas = []
    tags.forEach(tag => {
        promesas.push(Tag.findOrCreate({
            where: {nombre: {[Op.eq]: tag.nombre}},
            defaults: tag
        }))
    })
    const result = await Promise.all(promesas)
    return result.map(([tag, creado]) => tag)
}



//post --> /create-image
const createPostWithImages = async(req, res) => {
    const data = req.body //imagenes: array

    const newPost = await Post.create({
        texto: data.texto, 
        userId: data.userId})

    const imgs = await findOrCreateImages(data.imagenes)

    await newPost.addImagenes(imgs)

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
    
    const tags = await findOrCreateTags(data.tags)

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
    
    const imgs = await findOrCreateImages(data.imagenes)
    const tags = await findOrCreateTags(data.tags)

    await newPost.addImagenes(imgs)
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
    getImagesByPost, 
    addTagToPost, 
    deleteTagFromPost,
    getPostsByTag,
    getTagsByPost,
    getCommentsByPost,
    getPostsOfFollowedUsers,
    createPostWithImages,
    createPostWithTags,
    createPostCompleto}
