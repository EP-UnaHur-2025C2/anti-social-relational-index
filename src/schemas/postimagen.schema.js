const joi =require('joi');

const urlSchema=
 joi.object({
    url: joi.string().uri().required.messages({
        "any.required": "La URL es obligatoria", 
        "string.uri": "Debe ser una URL válida",
        "string.empty": "La URL no puede estar vacía"
      })
});

const allImagesSchema = joi.array().items(urlSchema);


module.exports={urlSchema, allImagesSchema}