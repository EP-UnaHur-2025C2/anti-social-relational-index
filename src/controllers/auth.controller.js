const generateToken = require('../utils/token-generator');
const bcrypt = require('bcrypt');
const { User } = require('../db');

// Helper: remove sensitive fields we don't want to send to the client
const safeUserFromModel = (userInstance) => {
    if (!userInstance) return null;
    // If it's a Sequelize instance, access dataValues; otherwise assume plain object
    const u = userInstance.dataValues ? userInstance.dataValues : userInstance;
    return {
        id: u.id,
        username: u.username,
        email: u.email
    };
};

const login = async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) return res.status(400).json({ message: 'Se requiere usuario y contraseña' });

        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = generateToken(user);

        const safeUser = safeUserFromModel(user);
        res.status(200).json({ token, user: safeUser });
};

// GET /auth/me - devuelve el usuario autenticado (verificado por middleware)
const me = async (req, res) => {
    const user = req.user; // populate por el middleware authenticateToken
    if (!user) return res.status(401).json({ message: 'Usuario no autenticado' });

    const safeUser = safeUserFromModel(user);
    return res.status(200).json(safeUser);
};

module.exports = { login, me };

