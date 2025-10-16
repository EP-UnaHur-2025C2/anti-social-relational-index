import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret_key = process.env.JWT_SECRET_KEY;

export const authenticateToken = (req, res, next) => {

    const token = req.headers['authorization'].split(' ')[1]; // Obtener el token del encabezado Authorization

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    jwt.verify(token, secret_key, (err) => {
        if (err) return res.status(403).json({ message: "Token inválido" });
        next();
    });
};
