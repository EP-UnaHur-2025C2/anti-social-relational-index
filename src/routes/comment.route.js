const {Router} = require('express');
const router = Router();
const commentControllers = require('../controllers/comment.controller');
const {validComment, validCommentBody, validUserPatch, validPostPatch} = require('../middlewares/comment.middleware')
const {invalidId} = require('../middlewares/generic.middleware');
const {comentarioSchema, comentarioPatchSchema} = require('../schemas/comment.schema');
const { validPost } = require('../middlewares/post.middleware');
const { validUser } = require('../middlewares/user.midleware');

//validar que el usuario exista para crear un comentario (igual que el post)!!!

//CRUD
router.get("/", commentControllers.getComments);
router.get('/:id',invalidId, validComment, commentControllers.getCommentById); //si hay una validComment en el middleware iria despues de invalidId
router.post('/', validCommentBody(comentarioSchema), validPost, commentControllers.createComment); //middleware o schema para usuarioId y postID
router.patch('/:id',invalidId, validComment, validCommentBody(comentarioPatchSchema), validUserPatch, validPostPatch, commentControllers.updateComment); //si hay una validComment en el middleware iria despues de invalidId
router.delete('/:id',invalidId, validComment, commentControllers.deleteComment);

module.exports =  router ;