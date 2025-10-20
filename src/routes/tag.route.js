const {Router} = require('express');
const router = Router();
const tagController = require('../controllers/tag.controller');
const {invalidId} = require('../middlewares/generic.middleware');
const {validTag, validTagBody, validTagUnico} = require('../middlewares/tag.middleware');
const {tagSchema, tagPatchSchema} = require('../schemas/tag.schema');


router.get("/", tagController.getTags);
router.get('/:id',invalidId, validTag, tagController.getTagById); 
router.post('/', validTagBody(tagSchema), validTagUnico, tagController.createTag); 
router.patch('/:id',invalidId, validTag,validTagUnico, validTagBody(tagPatchSchema), tagController.updateTag);
router.delete('/:id',invalidId, validTag, tagController.deleteTag);

module.exports =  router ; 