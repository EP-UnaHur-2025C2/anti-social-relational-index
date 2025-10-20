const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret_key = (process.env.JWT_SECRET_KEY || "supersecretkey123");

// *Función que genera un token JWT
const generateToken = (userData) => {
    const user = { id: userData.id, username: userData.username };
    const expiration = { expiresIn: '10h' };

    return jwt.sign(user, secret_key, expiration);
};

module.exports = generateToken;
