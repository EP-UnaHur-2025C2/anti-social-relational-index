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
         "any.required": "El email es obligatorio",
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
    "any.required": "El email es obligatorio",
    "string.email": "Debe ser un email válido",
    "string.empty": "El email no puede estar vacío"  
    })
});

const schemaPatch = joi.object({
    username : joi.string().min(4).max(30).messages({
        "string.empty": "El Nickname no puede estar vacío",
        "string.min": "El Nickname debe tener al menos 4 caracteres",
        "string.max" : "El nickname debe contener como maximo {#limit} de caracteres"
    }),


    email: joi.string().email().messages({  
         "string.email": "Debe ser un email válido",
         "string.empty": "El email no puede estar vacío"  

    }),

    password: joi.string().min(4).max(30).messages({
        "string.empty": "La contraseña no puede estar vacía",
        "string.min": "La contraseña debe tener al menos 4 caracteres",
        "string.max" : "La contraseña debe contener como maximo {#limit} de caracteres"
    })
})

const schemaLogin = joi.object({
    username : joi.string().min(4).max(30).required().messages({
        "any.required": "El Nickname es obligatorio",
        "string.empty": "El Nickname no puede estar vacío",
        "string.min": "El Nickname debe tener al menos 4 caracteres",
        "string.max" : "El nickname debe contener como maximo {#limit} de caracteres"
    }),

    password: joi.string().min(4).max(30).required().messages({
        "any.required": "La contraseña es obligatoria",
        "string.empty": "La contraseña no puede estar vacía",
        "string.min": "La contraseña debe tener al menos 4 caracteres",
        "string.max" : "La contraseña debe contener como maximo {#limit} de caracteres"
    })
});

module.exports={schema, emailSchema, schemaPatch, schemaLogin};