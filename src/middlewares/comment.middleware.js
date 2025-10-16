const {Comment, User, Post} = require('../db/models');

const validComment = async (req, res, next) => {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
        return res.status(404).json({ message: 'Comment no encontrado' });
    }
    next();
}

const validCommentBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json(error);
        }
        next();
    }
}

const validUserPatch = async (req, res, next) => {
    if(req.body.usuarioId) {
        const user = await User.findByPk(req.body.usuarioId)
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }
}

const validPostPatch = async (req, res, next) => {
    if(req.body.postId) {
        const post = await Post.findByPk(req.body.postId)
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
    }
}

module.exports = { validComment, validCommentBody, validUserPatch, validPostPatch };