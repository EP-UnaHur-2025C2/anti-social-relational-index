const {Tag} = require('../db/models');
const {errorMapper} = require("./errorMapper")

const validTag = async (req, res, next) => {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
        return res.status(404).json({ message: 'Tag no encontrado' });
    }
    next();
}

const validTagDelete = async (req, res, next) => {
    const tag = await Tag.findByPk(req.params.idTag);
    if (!tag) {
        return res.status(404).json({ message: 'Tag no encontrado' });
    }
    next();
}

const validTagBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({errores: errorMapper(error)});
        }
        next();
    }
}

const validTagUnico = async (req, res, next) => {
    const { nombre } = req.body;
   
    if (!nombre) {
        next()
    }
    else if(!await Tag.findOne({ where: { nombre }})){
        next()
    }
    else {
        return res.status(409).json({message: "El Tag ya existe"});
    }
}

module.exports = { validTag, validTagBody, validTagUnico, validTagDelete };