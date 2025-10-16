const joi =require('joi');

const urlSchema=
 joi.object({
    url: joi.string().uri().messages({ 
        "string.uri": "Debe ser una URL válida",
        "string.empty": "La URL no puede estar vacía"
      })
});

const allImagesSchema = joi.array().items(
  joi.object({
    url: joi.string().uri().required()
  })
);


module.exports={urlSchema, allImagesSchema}