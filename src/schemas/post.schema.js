const joi = require('joi');
const { allTagsSchema } = require('./tag.schema');
const { allImagesSchema } = require('./postimagen.schema');

const contenidoSchema= joi.object({
    texto: joi.string().trim().min(10).max(200).messages({
        "string.empty": "El texto no puede estar vacio",      
        "string.min": "El contenido debe tener al menos 10 caracteres",
        "string.max": "El contenido debe contener como maximo {#limit} de caracteres"
})
});
const creationSchema = joi.object({
    texto: joi.string().trim().required().min(10).max(200).messages({
        "any.required" :"texto es obligatorio",
        "string.min" : "El contenido debe contener como minimo {#limit} de caracteres",
        "string.max" : "El contenido debe contener como maximo {#limit} de caracteres",
        "string.empty": "El texto no puede estar vacio",
    }),

    //*No es necesario que venga el userId porque se lo toma del token
    //*el post se crea para el usuario que hizo la peticion
    //*si se quisiera crear un post para otro usuario, ahi si tendria sentido validar que el userId exista
    
    // usuarioId: joi.number().integer().required().messages({
    //     "any.required" :"el id de usuario es obligatorio",
    //     "number.base": "El id de usuario debe ser un número",
    //     "number.integer": "El id de usuario debe ser un número entero"
    // })
    
});

const postCompletoSchema = creationSchema.concat(
    joi.object({
        imagenes: allImagesSchema,
        tags: allTagsSchema
}))
module.exports={contenidoSchema, creationSchema, postCompletoSchema}