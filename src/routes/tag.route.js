const {Router} = require('express');
const router = Router();
const tagController = require('../controllers/tag.controller');
const {invalidId} = require('../middlewares/generic.middleware');

//CRUD
router.get("/", tagController.getTags);
router.get('/:id',invalidId, tagController.getTagById);
router.post('/', tagController.createTag);
router.put('/:id',invalidId, tagController.updateTag);
router.delete('/:id',invalidId, tagController.deleteTag);

module.exports =  router ; 