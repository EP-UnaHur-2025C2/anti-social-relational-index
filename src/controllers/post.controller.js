const { where, or } = require("sequelize")
const {Post, PostImagen, Tag, Comment, User} = require("../db/models")
const { Op } = require("sequelize")

// try / catch ; ver middlewares

//app.use("/post")

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
    const {texto} = req.body //para que no se pueda mandar el usuarioId por body
    const data = {texto, usuarioId: req.user.id} //el id del usuario autenticado
    const newPost = await Post.create(data)
    res.status(201).json(newPost)
}

//put --> /:id
const updatePost = async(req, res) => {
    const id = req.params.id
    const {texto} = req.body
    const post = await Post.findByPk(id)

    await post.update({texto})
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
const addNewImageToPost = async(req, res) => {
    const idPost = req.params.id
    const url = req.body.url //se manda solo la url por post
    const post = await Post.findByPk(idPost)

    const [img, creada] = await PostImagen.findOrCreate({ //si la imagen ya estaba asociada a un post, se reasocia al que se manda por parametro (?)
        where: {url}, 
        defaults: {url, postId: post.id}
    })

    await post.addImagene(img)

    const imagenes = await post.getImagenes()

    res.status(creada ? 201 : 200).json(imagenes) //trae array con todas las imagenes + la nueva (supuestamente)
}

//delete --> /:id/imgs/:idImage
const deleteImageFromPost = async(req, res) => {
    const idPost = req.params.id
    const idImagen = req.params.idImagen
    const post = await Post.findByPk(idPost)
    const imagen = await PostImagen.findByPk(idImagen)

    await imagen.destroy()

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





//post --> /:id/tag 
const addTagToPost = async(req, res) => {
    const idPost = req.params.id
    const {nombre} = req.body
    const post = await Post.findByPk(idPost)
    const [tag, creado] = await Tag.findOrCreate({where: {nombre} })

    await post.addTag(tag)

    const tags = await post.getTags({attributes: ["nombre"]})

    res.status(creado ? 201 : 200).json(tags)
}

// delete --> /:id/tags/:idTag
const deleteTagFromPost = async(req, res) => {
    const idPost = req.params.id
    const idTag = req.params.idTag
    const post = await Post.findByPk(idPost)
    const tag = await Tag.findByPk(idTag)

    await post.removeTag(tag)

    const postWithTags = await post.getTags({attributes: ["nombre"]})
    res.status(200).json(postWithTags) //o solo devolver el tag eliminado?
}

// get --> /tag/:id. Solo muestra el post sin comentarios + el tag que se busca (si tiene mas tags, no se muestran)
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

//get --> /:id/tags
const getTagsByPost = async(req, res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    const tags = await post.getTags({attributes: ["nombre"]})
    res.status(200).json(tags)
}





// get --> /:id/comments
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

//get --> /lazy/:id //muestra los primeros 10 comentarios de un post. Puede ser dinámico con la ruta
const getFirstTenCommentsById = async(req, res) => {
    const id = req.params.id
    let {count, rows} = await Comment.findAndCountAll({
        where: {postId: id}, //solo muestra los visibles
        limit: 10,
        offset: 0,
        order: [["createdAt", "DESC"]],
        include: {model: User, as: "usuario"},
        attributes: ["id", "texto", "createdAt"]
    })

    visibles = rows.filter(c => c.visible)
    resultado = {total: count, primeros_diez_comentarios: visibles}

    res.status(200).json(resultado)
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





const findOrCreateImages = async(imagenes, postId, transaction = null) => {
    const imgs = []
    // hacer secuencial para evitar condiciones de carrera sobre UNIQUE
    for (const img of imagenes) {
        let found = await PostImagen.findOne({ where: { url: { [Op.eq]: img.url } }, transaction })
        if (!found) {
            // incluir postId en la creación para respetar posibles NOT NULL de la FK
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



//post --> /create-image
const createPostWithImages = async(req, res) => {
    const {texto, imagenes} = req.body // imagenes: array
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

// post --> /create-tag
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

//post --> /create-completo
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
    getFirstTenCommentsById,
    getPostsOfFollowedUsers,
    createPostWithImages,
    createPostWithTags,
    createPostCompleto}
