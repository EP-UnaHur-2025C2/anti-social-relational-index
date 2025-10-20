const { where, or } = require("sequelize")
const {Post, PostImagen, Tag, Comment, User} = require("../db")
const { Op } = require("sequelize")


const includePostSinComentarios = [
    {model: User, as: "usuario", attributes: ["username"]},
    {model: PostImagen, as: "imagenes", attributes: ["id", "url"]},
    {model: Tag, as:"tags", attributes: ["id", "nombre"], through: { attributes: []}}
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
        include: {model: User, as: "usuario", attributes: ["username"]},
        attributes: {exclude: ["updatedAt"]}
    }
]

const getPostCompletoById = async(id) => {
    return await Post.findByPk(id, {
        include: includePostCompleto,
        order: [[{model: Comment, as: "comentarios"}, "createdAt", "ASC"]],
    })
}




const getPosts = async (req, res) => {
    const posts = await getPostsSinComentarios()
    res.status(200).json(posts)
}


const getPostById = async(req, res) => {
    const id = req.params.id
    const post = await getPostCompletoById(id)
    res.status(200).json(post)
}


const createPost = async(req, res) => {
    const {texto} = req.body 
    const data = {texto, usuarioId: req.user.id} 
    const newPost = await Post.create(data)
    res.status(201).json(newPost)
}


const updatePost = async(req, res) => {
    const id = req.params.id
    const {texto} = req.body
    const post = await Post.findByPk(id)

    await post.update({texto})
    res.status(200).json(post)
}


const deletePost = async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)

    const removed = await post.destroy()
    res.status(200).json(removed) 
}






const addNewImageToPost = async(req, res) => {
    const idPost = req.params.id
    const url = req.body.url 
    const post = await Post.findByPk(idPost)

    const [img, creada] = await PostImagen.findOrCreate({ 
        where: {url}, 
        defaults: {url, postId: post.id}
    })

    await post.addImagene(img)

    const imagenes = await post.getImagenes()

    res.status(creada ? 201 : 200).json(imagenes) 
}


const deleteImageFromPost = async(req, res) => {
    const idPost = req.params.id
    const idImg = req.params.idImagen
    const post = await Post.findByPk(idPost)
    const imagen = await PostImagen.findByPk(idImg)

    await imagen.destroy()

    const imagenesRestantes = await post.getImagenes()
    res.status(200).json(imagenesRestantes)
}


const getImagesByPost = async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    const images = await post.getImagenes()
    res.status(200).json(images)
}






const addTagToPost = async(req, res) => {
    const idPost = req.params.id
    const {nombre} = req.body
    const post = await Post.findByPk(idPost)
    const [tag, creado] = await Tag.findOrCreate({where: {nombre} })

    await post.addTag(tag)

    const tags = await post.getTags({attributes: ["nombre"]})

    res.status(creado ? 201 : 200).json(tags)
}


const deleteTagFromPost = async(req, res) => {
    const idPost = req.params.id
    const idTag = req.params.idTag
    const post = await Post.findByPk(idPost)
    const tag = await Tag.findByPk(idTag)

    await post.removeTag(tag)

    const postWithTags = await post.getTags({attributes: ["nombre"]})
    res.status(200).json(postWithTags) 
}


const getPostsByTag = async(req, res) => {
    const idTag = req.params.id

    const posts = await Post.findAll({
        include: [
            ...includePostSinComentarios,
            {
                model: Tag,
                as: "tags",
                where: {id: {[Op.eq]: idTag}}
            }
        ]
    })

    res.status(200).json(posts)
}


const getTagsByPost = async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    const tags = await post.getTags({attributes: ["nombre"]})
    res.status(200).json(tags)
}






const getCommentsByPost = async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    let comentarios = await post.getComentarios({
        include: {model: User, as: "usuario", attributes: ["username"]},
        order: [["createdAt", "ASC"]],
        attributes: {exclude: ["updatedAt"]}
    })

    comentarios = comentarios.filter(c => c.visible)

    res.status(200).json(comentarios)
}


const getLatestTenCommentsById = async(req, res) => {
    const id = req.params.id
    let {count, rows} = await Comment.findAndCountAll({
        where: {postId: id}, 
        limit: 10,
        offset: 0,
        order: [["createdAt", "DESC"]],
        include: {model: User, as: "usuario", attributes: ["id","username"]},
        attributes: ["id", "texto", "createdAt"]
    })

    visibles = rows.filter(c => c.visible)
    resultado = {total: count, ultimos_diez_comentarios: visibles}

    res.status(200).json(resultado)
}






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





const findOrCreateImages = async(imagenes, postId, transaction = null) => {
    const imgs = []

    for (const img of imagenes) {
        let found = await PostImagen.findOne({ where: { url: { [Op.eq]: img.url } }, transaction })
        if (!found) {
            found = await PostImagen.create({ url: img.url, postId }, { transaction })
        }
        imgs.push(found)
    }
    return imgs
}

const findOrCreateTags = async(tags, postId, transaction = null) => {
    const result = []
    for (const tag of tags) {
        let found = await Tag.findOne({ where: { nombre: { [Op.eq]: tag.nombre } }, transaction })
        if (!found) {
            found = await Tag.create({ nombre: tag.nombre, postId }, { transaction })
        }
        result.push(found)
    }
    return result
}




const createPostWithImages = async(req, res) => {
    const {texto, imagenes} = req.body 
    const data = {texto, usuarioId: req.user.id}

    const transaction = await Post.sequelize.transaction()
    
    const newPost = await Post.create(data, { transaction })

    const imgs = await findOrCreateImages(imagenes || [], newPost.id, transaction)

    await newPost.addImagenes(imgs, { transaction })

    await transaction.commit()

    const postWithImages = await Post.findByPk(newPost.id, {
            include: [
                {model: User, as:"usuario", attributes: ["username"]},
                {model: PostImagen, as: "imagenes", attributes: ["id", "url"]}
            ]
    })

    res.status(201).json(postWithImages)

}


const createPostWithTags = async(req, res) => {
    const {texto, tags} = req.body
    const data = {texto, usuarioId: req.user.id}

    const transaction = await Post.sequelize.transaction()

    const newPost = await Post.create(data, { transaction })

    const tagsObj = await findOrCreateTags(tags || [], newPost.id, transaction)

    await newPost.addTags(tagsObj, { transaction })

    await transaction.commit()

    const postWithTags = await Post.findByPk(newPost.id, {
        include: [
            {model: User, as:"usuario", attributes: ["username"]},
            {model: Tag, as: "tags", attributes: ["id","nombre"], through: {attributes: []}}
        ]})

    res.status(201).json(postWithTags)
}


const createPostCompleto = async(req, res) => {
    const {texto, imagenes, tags} = req.body
    const data = {texto, usuarioId:req.user.id}

    const transaction = await Post.sequelize.transaction()
    try {
        const newPost = await Post.create(data, { transaction })

        const imgs = await findOrCreateImages(imagenes || [], newPost.id, transaction)
        await newPost.addImagenes(imgs, { transaction })

        const tagsObj = await findOrCreateTags(tags || [], newPost.id, transaction)
        await newPost.addTags(tagsObj, { transaction })

        await transaction.commit()

        const postCompleto = await Post.findByPk(newPost.id, {
            include: [
                {model: User, as:"usuario", attributes: ["username"]},
                {model: PostImagen, as: "imagenes", attributes: ["id", "url"]},
                {model: Tag, as: "tags", attributes: ["id","nombre"], through: {attributes: []}}
            ]
        })
        res.status(201).json(postCompleto)
    } catch (error) {
        await transaction.rollback()
        throw error
    }
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
    getLatestTenCommentsById,
    getPostsOfFollowedUsers,
    createPostWithImages,
    createPostWithTags,
    createPostCompleto}
