const joi=require('joi')

const contenidoSchema= joi.object({
    texto: joi.string().trim().min(10).max(200).messages({
        "string.empty": "El contenido no puede estar vacío",        
        "string.min": "El contenido debe tener al menos 10 caracteres",
        "string.max": "El contenido debe contener como maximo {#limit} de caracteres
})
});
    
module.exports={contenidoSchema}