const { Post } = require('../db/models');
const {errorMapper} = require("./errorMapper")

const validPost = async (req, res, next) => {
    const post = await Post.findByPk(req.body.postId || req.params.id);
    if (!post) {
        return res.status(404).json({ message: 'Post no encontrado' });
    }
    next();
}

//*Asumiendo que un usuario no puede modificar/eliminar posts de otros usuarios
const validPostByUser = async (req, res, next) => {
    const post = await Post.findByPk(req.params.id);

    if (post.usuarioId !== req.user.id) {
        return res.status(403).json({ message: 'No autorizado' });
    }
    next();
}

const validPostBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({errores: errorMapper(error)});
        }
        next();
    }
}

const validPostImagesBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({errores: errorMapper(error)});
        }
        next();
    }
}

module.exports = { validPost, validPostBody, validPostImagesBody, validPostByUser };