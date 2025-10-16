import { generateToken } from "../utils/token-generator";
import bcrypt from 'bcrypt';
import User from "../models/user.model";

export const login = async (req, res) => {
     const { username, password } = req.body;

     // *Se debe verificar las credenciales del usuario 
    const user = await User.findOne({ where: { username } });

    const isMatch = bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
};
