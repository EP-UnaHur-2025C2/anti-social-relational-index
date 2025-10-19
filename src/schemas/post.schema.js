const joi = require('joi');
const {tagSchema } = require('./tag.schema');
const { urlSchema } = require('./postimagen.schema');

const textoSchema = joi.string().trim().required().min(10).max(200).messages({
        "any.required" :"texto es obligatorio",
        "string.min" : "El contenido debe contener como minimo {#limit} de caracteres",
        "string.max" : "El contenido debe contener como maximo {#limit} de caracteres",
        "string.empty": "El texto no puede estar vacio",
    })

const imagenesSchema = joi.array().min(1).required().items(urlSchema).messages({
        "any.required": "Las imágenes son obligatorias",
        "array.min": "El arreglo de imágenes no puede estar vacío",
        "array.base": "Las imágenes que se pasan deben ser un arreglo",
    })

const createTagsSchema = joi.array().min(1).required().items(tagSchema).messages({
        "any.required": "Las etiquetas son obligatorias",
        "array.min": "El arreglo de etiquetas no puede estar vacío",
        "array.base": "Las etiquetas que se pasan deben ser un arreglo",

    })    



//? No se repiten aca entre contenidoSchema y creationSchema? --> uno es requerido y otro no (para patch)
const contenidoSchema= joi.object({
    texto: joi.string().trim().min(10).max(200).messages({
        "string.empty": "El texto no puede estar vacio",      
        "string.min": "El contenido debe tener al menos 10 caracteres",
        "string.max": "El contenido debe contener como maximo {#limit} de caracteres"
})
});

const creationSchema = joi.object({
    texto: textoSchema,

    //*No es necesario que venga el userId porque se lo toma del token
    //*el post se crea para el usuario que hizo la peticion
    //*si se quisiera crear un post para otro usuario, ahi si tendria sentido validar que el userId exista
    
    // usuarioId: joi.number().integer().required().messages({
    //     "any.required" :"el id de usuario es obligatorio",
    //     "number.base": "El id de usuario debe ser un número",
    //     "number.integer": "El id de usuario debe ser un número entero"
    // })
    
});



const postImagenes = joi.object({
    texto: textoSchema,

    imagenes: imagenesSchema
});


const postCompleto = joi.object({
    texto: textoSchema,

    imagenes: imagenesSchema,
    
    tags: createTagsSchema
});



const postTags = joi.object({
    texto: textoSchema,

    tags: createTagsSchema
});


module.exports={contenidoSchema, creationSchema, postCompleto, postTags, postImagenes};