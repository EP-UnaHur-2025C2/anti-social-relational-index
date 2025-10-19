const joi = require('joi')

const tagSchema = joi.object({
    nombre: joi.string().min(5).max(30).required().messages({
        "any.required": "El nombre es obligatorio",
        "string.empty": "El nombre no puede estar vacío",
        "string.min": "El nombre debe tener al menos 5 caracteres",
        "string.max": "El nombre debe contener como maximo {#limit} de caracteres"

    })
});

const tagPatchSchema = joi.object({
    nombre: joi.string().min(5).max(30).messages({
        "string.empty": "El nombre no puede estar vacío",
        "string.min": "El nombre debe tener al menos 5 caracteres",
        "string.max": "El nombre debe contener como maximo {#limit} de caracteres"
    })
})


module.exports = { tagSchema, tagPatchSchema}