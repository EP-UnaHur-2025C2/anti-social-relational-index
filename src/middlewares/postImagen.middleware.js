const { PostImagen } = require('../db/models');

const validPostImagen = async (req, res, next) => {
    const idImagen = req.params.idImagen || req.params.id;
    const postImagen = await PostImagen.findByPk(idImagen);
    if (!postImagen) {
        return res.status(404).json({ message: 'imagen no encontrada' });
    }
    next();
}

module.exports = { validPostImagen }