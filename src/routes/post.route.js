const {Router} = require('express');
const router = Router();
const postController = require('../controllers/post.controller');
const {invalidId} = require('../middlewares/generic.middleware');
//const {validPost, validationSchemma} = require('../middlewares/post.middleware');

//Filtros
router.get("/tag/:id", postController.getPostsByTag);
router.post("/create-image", postController.createPostWithImages);
router.post("/create-tag", postController.createPostWithTags);
router.post("/create-completo", postController.createPostCompleto); 

//CRUD
router.get("/", postController.getPosts);
router.get('/:id',invalidId, postController.getPostById);
router.post('/', postController.createPost);
router.put('/:id',invalidId, postController.updatePost);
router.delete('/:id',invalidId, postController.deletePost);

//Imagenes
router.get('/:id/imagenes', invalidId, postController.getImagesByPost)
router.post('/:id/imagenes',invalidId, postController.addNewImageToPost);
router.delete('/:id/imagenes/:idImagen',invalidId, postController.deleteImageFromPost);

//Tags
router.get('/:id/tags', invalidId, postController.getTagsByPost)
router.put('/:id/tag/:idTag',invalidId, postController.addTagToPost);
router.delete('/:id/tag/:idTag',invalidId, postController.deleteTagFromPost);

//Comentarios y Feed de Posts
router.get('/:id/comments',invalidId, postController.getCommentsByPost);
router.get('/:id/feed',invalidId, postController.getPostsOfFollowedUsers);

module.exports =  router ;  