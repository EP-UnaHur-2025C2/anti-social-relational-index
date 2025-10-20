const {User} = require('../db/models')
const {errorMapper} = require("./errorMapper")


const validUser =async (req, res, next) =>{

    if(await User.findOne({where:{id:req.params.id}})){
        next()
    }
        
    else{
        return res.status(400).json({message:"Bad request: no se encuentra el usuario"})
    }
    
}



const validUsername = async (req, res, next) => {
    const { username } = req.body;
    if(username.includes(" ")) {
        return res.status(400).json({ message: "El username no puede contener espacios" });
    }
    if(!await User.findOne({ where: { username }})){
        next()
    }
    else {
        return res.status(409).json({message: "El username ya existe"});
    }
}

const validUsernamePatch = async (req, res, next) => {
    const { username } = req.body;
    
    if(!username){
        next()
    }
    else if(!await User.findOne({ where: { username }})){
        next()
    }
    else {
        return res.status(409).json({message: "El username ya existe"});
    }
}

const validEmail = async (req, res, next) => {
    const { email } = req.body;
    if(!await User.findOne({ where: { email }})){
        next()
    }
    else {
        return res.status(409).json({message: "El email ya se encuentra registrado"});
    }
}

const validEmailPatch = async (req, res, next) => {
    const { email } = req.body;

    if(!email){
        next()
    }
    else if(!await User.findOne({ where: { email }})){
        next()
    }
    else {
        return res.status(409).json({message: "El email ya se encuentra registrado"});
    }
}


const validPassword = async (req, res, next) => {
    const { password } = req.body;
    if (!password.trim()) {
        return res.status(400).json({ message: "La password es requerida" });
    }
    if(password.includes(" ")) {
        return res.status(400).json({ message: "La contraseña no puede contener espacios" });
    }
    next()
}

const validationSchema = (schema) =>{
    return (req, res, next) =>{
        const {error, _} = schema.validate(req.body, {abortEarly:false}) 
        if(error){ 
            return res.status(400).json({errores: errorMapper(error)})
        }
        next()
    }
}
 
const validationEmailSchema = (schema) =>{
    return (req, res, next) =>{
        const {error, _} = schema.validate(req.body, {abortEarly:false})
        if(error){
            return res.status(400).json({errores: errorMapper(error)})
        }
        next()
    }
}

const validUserByParam = (parametro) => {
    return async(req, res, next) => {
        const id = req.params[parametro]
        const user = await User.findOne({where: {id}})
        if (!user) {
            return res.status(404).json({message: `Usuario con id ${id} no existe`})
        }
        next()
    }
}

const validFollowUsers = (param1,param2) => {
    return async(req, res, next) => {
        const id1 = req.params[param1]
        const id2 = req.params[param2]

        if(id1 === id2){
            return res.status(400).json({message: "Bad request: Acción inválida sobre el mismo usuario"})
        }

        next()
    }
}

const validAuthUser = async (req, res, next) => {
    const user = await User.findByPk(req.params.id);

    if (user.id !== req.user.id) {
        return res.status(403).json({ message: 'No autorizado' });
    }
    next();
}

module.exports = {validUser,validUsername, validEmail ,validationSchema, validationEmailSchema, validUserByParam, validUsernamePatch, validEmailPatch, validFollowUsers, validAuthUser, validPassword};   