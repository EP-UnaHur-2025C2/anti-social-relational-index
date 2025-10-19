const { PostImagen } = require('../db/models');

const validPostImagen = async (req, res, next) => {
    const idImagen = req.params.idImagen || req.params.id;
    const postImagen = await PostImagen.findByPk(idImagen);
    if (!postImagen) {
        return res.status(404).json({ message: 'imagen no encontrada' });
    }
    next();
}

const validUrl = async (req, res, next) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ message: "La URL es requerida" });
    }
    if(!await PostImagen.findOne({ where: { url }})){
        next()
    }
    else {
        return res.status(409).json({message: "La URL ya existe"});
    }
}

const validUrlArray = async (req, res, next) => {
    const { imagenes } = req.body;
    if (!imagenes || !Array.isArray(imagenes)) {
        return res.status(400).json({ message: "Las URLs son requeridas" });
    }
    for (const obj of imagenes) {
        const { url } = obj;
        if (await PostImagen.findOne({ where: { url }})) {
            return res.status(409).json({ message: `La URL ${url} ya existe` });
        }
    }
    next();
}

module.exports = { validPostImagen, validUrl, validUrlArray }