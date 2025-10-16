const generateToken = require('../utils/token-generator');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const login = async (req, res) => {
    const { username, password } = req.body;

    // *Se debe verificar las credenciales del usuario 
    const user = await User.findOne({ where: { username } });
    if (!username || !password) return res.status(400).json({ message: 'Se requiere usuario y contraseña' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
};

module.exports = { login };
