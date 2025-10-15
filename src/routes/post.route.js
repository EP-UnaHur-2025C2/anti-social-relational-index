const {Router} = require('express');
const router = Router();
const postController = require('../controllers/post.controller');
const {invalidId} = require('../middlewares/generic.middleware');
//const {validPost, validationSchemma} = require('../middlewares/post.middleware');

//validar que el usuario exista!!!

//CRUD
router.get("/", postController.getPosts);
router.get('/:id',invalidId, postController.getPostById);
router.post('/', postController.createPost);
router.put('/:id',invalidId, postController.updatePost);
router.delete('/:id',invalidId, postController.deletePost);

//Filtros
router.get("/tag/:id", postController.getPostsByTag);
router.post("/create-imagenes", postController.createPostWithImages);
router.post("/create-tags", postController.createPostWithTags);
router.post("/create-completo", postController.createPostCompleto);

//Imagenes
router.get('/:id/imagenes', invalidId, postController.getImagesByPost)
router.post('/:id/imagenes',invalidId, postController.addNewImageToPost); //se tiene que mandar url
router.delete('/:id/imagenes/:idImagen',invalidId, postController.deleteImageFromPost);

//Tags
router.get('/:id/tags', invalidId, postController.getTagsByPost)
router.post('/:id/tag',invalidId, postController.addTagToPost); //verificar que el nombre del tag venga en el body (middleware o schema)
router.delete('/:id/tag/:idTag',invalidId, postController.deleteTagFromPost);

//Comentarios y Feed de Posts
router.get('/:id/comments',invalidId, postController.getCommentsByPost);
router.get('/:id/comments/lazy', invalidId, postController.getFirstTenCommentsById)
router.get('/user/:id/feed',invalidId, postController.getPostsOfFollowedUsers);

module.exports =  router ;  