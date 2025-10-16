const {Router} = require('express');
const router = Router();
const tagController = require('../controllers/tag.controller');
const {invalidId} = require('../middlewares/generic.middleware');
const {validTag, validTagBody} = require('../middlewares/tag.middleware');
const {tagSchema} = require('../schemas/tag.schema');

//CRUD
router.get("/", tagController.getTags);
router.get('/:id',invalidId, validTag, tagController.getTagById); //tira null si el id no existe
router.post('/', validTagBody(tagSchema), tagController.createTag); //agregado del schema a las rutas, el validTag y del validTagBody(tagSchema)
router.put('/:id',invalidId, validTag, validTagBody(tagSchema), tagController.updateTag);
router.delete('/:id',invalidId, validTag, tagController.deleteTag);

module.exports =  router ; 