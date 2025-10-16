const joi=require('joi');
const user = require('../db/models/user');

const schema= joi.object({
    username : joi.string().min(4).max(30).required().messages({
        "any.required": "El Nickname es obligatorio",
        "string.empty": "El Nickname no puede estar vacío",
        "string.min": "El Nickname debe tener al menos 4 caracteres",
        "string.max" : "El nickname debe contener como maximo {#limit} de caracteres"
    }),


    email: joi.string().email().required().messages({  
         "string.email": "Debe ser un email válido",
         "string.empty": "El email no puede estar vacío"  

    }),

    password: joi.string().min(4).max(30).required().messages({
        "any.required": "La contraseña es obligatoria",
        "string.empty": "La contraseña no puede estar vacía",
        "string.min": "La contraseña debe tener al menos 4 caracteres",
        "string.max" : "La contraseña debe contener como maximo {#limit} de caracteres"
    })
});

const emailSchema = joi.object({
    email:joi.string().required().email().messages({
    "string.email": "Debe ser un email válido",
    "string.empty": "El email no puede estar vacío"  
    })
});


module.exports={schema, emailSchema}