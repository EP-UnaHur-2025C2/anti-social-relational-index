const validPostImagen = async (req, res, next) => {
    const postImagen = await PostImagen.findByPk(req.params.id);
    if (!postImagen) {
        return res.status(404).json({ message: 'imagen no encontrada' });
    }
    next();
}

module.exports = {validPostImagen}