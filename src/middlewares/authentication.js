
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../db/models');

const secret_key = process.env.JWT_SECRET_KEY;

const authenticateToken = async (req, res, next) => {

    // Obtener el header de forma segura (case-insensitive)
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header no proporcionado" });
    }

    // Soporta "Bearer <token>" o token directo
    const [type, token] = authHeader.split(" ")
    if (type !== "Bearer" || !token) {
        return res.status(401).json({message: "Token inválido o formato incorrecto"})
    }
    //const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    // if (!token) {
    //     return res.status(401).json({ message: "Token no proporcionado" });
    // }

    if (!secret_key) {
        return res.status(500).json({ message: "Secret key no configurada en el servidor" });
    }

    try {
        const payload = jwt.verify(token, secret_key);
        
        // ? Discutible si hace falta traerlo o no
        const user = await User.findByPk(payload.id);
    
        if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });
    
        req.user = user; // *Así podemos acceder al usuario autenticado en los controladores
        next();
    
    } catch (err) {
        // Opcional: diferenciar expirado vs inválido
        return res.status(401).json({ message: 'Token inválido' });
    }
        
};

module.exports = authenticateToken;
