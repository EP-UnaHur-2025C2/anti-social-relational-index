const {Router} = require('express');
const router = Router();
const commentControllers = require('../controllers/comment.controller');
//const {validComment} = require('../middlewares/comment.middleware')
const {invalidId} = require('../middlewares/generic.middleware');

//validar que el usuario exista para crear un comentario (igual que el post)!!!

//CRUD
router.get("/", commentControllers.getComments);
router.get('/:id',invalidId, commentControllers.getCommentById); //si hay una validComment en el middleware iria despues de invalidId
router.get('/lazy/:id', invalidId, commentControllers.getFirstTenCommentsById)
router.post('/', commentControllers.createComment);
router.put('/:id',invalidId, commentControllers.updateComment); //si hay una validComment en el middleware iria despues de invalidId
router.delete('/:id',invalidId, commentControllers.deleteComment);

module.exports =  router ;