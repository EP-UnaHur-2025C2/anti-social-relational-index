const joi = require('joi');


const comentarioSchema = joi.object ({
    texto : joi.string().required().min(5).max(200).messages({
        "any.required" :"Contenido es obligatorio",
        "string.min" : "El contenido debe contener como minimo {#limit} de caracteres",
        "string.max" : "El contenido debe contener como maximo {#limit} de caracteres",
        "string.empty": "El contenido no puede ser vacio"
    }),
    // usuarioId: joi.number().integer().required().messages({
    // "any.required": "El id de usuario es obligatorio",
    // "number.base": "El id de usuario debe ser un número",
    // "number.integer": "El id de usuario debe ser un número entero"
    // }),
    postId: joi.number().integer().required().messages({
    "any.required": "El id del post es obligatorio",
    "number.base": "El id del post debe ser un número",
    "number.integer": "El id del post debe ser un número entero"
    })
})

const comentarioPatchSchema = joi.object ({
    texto : joi.string().min(5).max(200).messages({
        "string.min" : "El contenido debe contener como minimo {#limit} de caracteres",
        "string.max" : "El contenido debe contener como maximo {#limit} de caracteres",
        "string.empty": "El contenido no puede ser vacio"
    }),
    // usuarioId: joi.number().integer().messages({
    // "any.required": "El id de usuario es obligatorio",
    // "number.base": "El id de usuario debe ser un número",
    // "number.integer": "El id de usuario debe ser un número entero"
    // }),
    postId: joi.number().integer().messages({
    "any.required": "El id del post es obligatorio",
    "number.base": "El id del post debe ser un número",
    "number.integer": "El id del post debe ser un número entero"
    })
})


module.exports = {comentarioSchema, comentarioPatchSchema}