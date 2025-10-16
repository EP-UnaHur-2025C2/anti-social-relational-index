const {Tag} = require('../db/models');

const validTag = async (req, res, next) => {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
        return res.status(404).json({ message: 'Tag no encontrado' });
    }
    next();
}

const validTagBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json(error);
        }
        next();
    }
}

module.exports = { validTag, validTagBody };