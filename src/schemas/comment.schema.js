const joi = require('joi');


const comentarioSchema = joi.object ({
    texto : joi.string().required().min(5).max(200).messages({
        "any.required" :"Contenido es obligatorio",
        "string.min" : "El contenido debe contener como minimo {#limit} de caracteres",
        "string.max" : "El contenido debe contener como maximo {#limit} de caracteres",
        "string.empty": "El contenido no puede ser vacio"
    })
})



module.exports = {comentarioSchema}