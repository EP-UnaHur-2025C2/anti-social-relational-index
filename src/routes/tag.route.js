const {Router} = require('express');
const router = Router();
const tagController = require('../controllers/tag.controller');
const {invalidId} = require('../middlewares/generic.middleware');
const {validTag, validTagBody, validTagUnico} = require('../middlewares/tag.middleware');
const {tagSchema, tagPatchSchema} = require('../schemas/tag.schema');

//CRUD
router.get("/", tagController.getTags);
router.get('/:id',invalidId, validTag, tagController.getTagById); //tira null si el id no existe
router.post('/', validTagBody(tagSchema), validTagUnico, tagController.createTag); //agregado del schema a las rutas, el validTag y del validTagBody(tagSchema)
router.patch('/:id',invalidId, validTag,validTagUnico, validTagBody(tagPatchSchema), tagController.updateTag);
router.delete('/:id',invalidId, validTag, tagController.deleteTag);

module.exports =  router ; 