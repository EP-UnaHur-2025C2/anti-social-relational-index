const { Post } = require('../db/models');

const validPost = async (req, res, next) => {
    const post = await Post.findByPk(req.body.postId || req.params.id);
    if (!post) {
        return res.status(404).json({ message: 'Post no encontrado' });
    }
    next();
}

const validPostBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json(error);
        }
        next();
    }
}

const validPostImagesBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json(error);
        }
        next();
    }
}

module.exports = { validPost, validPostBody, validPostImagesBody };