const {Router} = require('express');
const router = Router();
const commentControllers = require('../controllers/comment.controller');
const {validComment, validCommentBody, validCommentByUser} = require('../middlewares/comment.middleware')
const {invalidId} = require('../middlewares/generic.middleware');
const {comentarioSchema, comentarioPatchSchema} = require('../schemas/comment.schema');
const { validPost} = require('../middlewares/post.middleware');



router.get("/", commentControllers.getComments);
router.get('/:id',invalidId, validComment, commentControllers.getCommentById);
router.post('/', validCommentBody(comentarioSchema), validPost, commentControllers.createComment); 
router.patch('/:id',invalidId, validComment, validCommentByUser, validCommentBody(comentarioPatchSchema), commentControllers.updateComment); 
router.delete('/:id',invalidId, validComment, validCommentByUser, commentControllers.deleteComment);

module.exports =  router ;