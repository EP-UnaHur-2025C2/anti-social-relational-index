const {Comment} = require('../db/models');
const {errorMapper} = require("./errorMapper")

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
            return res.status(400).json({errores: errorMapper(error)});
        }
        next();
    }
}



module.exports = { validComment, validCommentBody};