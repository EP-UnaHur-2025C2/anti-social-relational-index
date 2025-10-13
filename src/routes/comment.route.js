const {Router} = require('express');
const router = Router();
const commentControllers = require('../controllers/comment.controllers');
const {validComment} = require('../middlewares/comment.middleware')
const {invalidId} = require('../middlewares/generic.middleware');

//CRUD
router.get("/", commentControllers.getComments);
router.get('/:id',invalidId, commentControllers.getCommentById); //si hay una validComment en el middleware iria despues de invalidId
router.post('/', commentControllers.createComment);
router.put('/:id',invalidId, commentControllers.updateComment); //si hay una validComment en el middleware iria despues de invalidId
router.delete('/:id',invalidId, commentControllers.deleteComment);

module.exports =  router ;