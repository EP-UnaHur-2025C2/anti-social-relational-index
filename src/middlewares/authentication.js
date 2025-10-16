const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../db/models');

const secret_key = process.env.JWT_SECRET_KEY;

const authenticateToken = async (req, res, next) => {

    const token = req.headers['authorization'].split(' ')[1]; // Obtener el token del encabezado Authorization

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
    const payload = jwt.verify(token, secret_key);
    
    // ? Discutible si hace falta traerlo o no
    const user = await User.findByPk(payload.id);

    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    req.user = user; // *Así podemos acceder al usuario autenticado en los controladores
    next();

  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
    
};

module.exports = authenticateToken;
