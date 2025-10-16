const joi = require('joi')

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
    username: joi.string().trim().required().messages({
        "any.required" :"el username es obligatorio"    ,
        "string.empty": "El username no puede estar vacio"
    })
    
});
module.exports={contenidoSchema, creationSchema}