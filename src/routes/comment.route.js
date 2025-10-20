const {Router} = require('express');
const router = Router();
const commentControllers = require('../controllers/comment.controller');
const {validComment, validCommentBody, validUserPatch, validPostPatch} = require('../middlewares/comment.middleware')
const {invalidId} = require('../middlewares/generic.middleware');
const {comentarioSchema, comentarioPatchSchema} = require('../schemas/comment.schema');
const { validPost } = require('../middlewares/post.middleware');




router.get("/", commentControllers.getComments);
router.get('/:id',invalidId, validComment, commentControllers.getCommentById);
router.post('/', validCommentBody(comentarioSchema), validPost, commentControllers.createComment); 
router.patch('/:id',invalidId, validComment, validCommentBody(comentarioPatchSchema), commentControllers.updateComment); 
router.delete('/:id',invalidId, validComment, commentControllers.deleteComment);

module.exports =  router ;