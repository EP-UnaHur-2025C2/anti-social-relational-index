const {Router} = require('express');
const router = Router();
const commentControllers = require('../controllers/comment.controller');
const {validComment, validCommentBody} = require('../middlewares/comment.middleware')
const {invalidId} = require('../middlewares/generic.middleware');
const {comentarioSchema} = require('../schemas/comment.schema')

//validar que el usuario exista para crear un comentario (igual que el post)!!!

//CRUD
router.get("/", commentControllers.getComments);
router.get('/:id',invalidId, validComment, commentControllers.getCommentById); //si hay una validComment en el middleware iria despues de invalidId
router.post('/', validCommentBody(comentarioSchema), commentControllers.createComment); //middleware o schema para usuarioId y postID
router.put('/:id',invalidId, validComment, validCommentBody(comentarioSchema), commentControllers.updateComment); //si hay una validComment en el middleware iria despues de invalidId
router.delete('/:id',invalidId, validComment, commentControllers.deleteComment);

module.exports =  router ;