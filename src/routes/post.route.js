const {Router} = require('express');
const router = Router();
const postController = require('../controllers/post.controller');
const {invalidId} = require('../middlewares/generic.middleware');
const {validPost, validPostBody, validPostImagesBody} = require('../middlewares/post.middleware');
const {creationSchema, contenidoSchema} = require('../schemas/post.schema');
const {imagesSchema} = require('../schemas/image.schema');
//validar que el usuario exista!!!

//CRUD
router.get("/", postController.getPosts);
router.get('/:id',invalidId, validPost, postController.getPostById); //agregado del validPost
router.post('/', validPostBody(creationSchema), postController.createPost); //agregado del schema a las rutas y del validPostBody(creationSchema)
router.put('/:id',invalidId,validPost, validPostBody(contenidoSchema), postController.updatePost); //agregado del schema a las rutas, validPPost del validPostBody(contenidoSchema)
router.delete('/:id',invalidId, validPost, postController.deletePost);

//Imagenes
router.get('/:id/imagenes', invalidId, postController.getImagesByPost)
router.post('/:id/imagenes',invalidId, validPost, validPostImagesBody(imagesSchema), postController.addNewImageToPost); //validPost y validPostImagesBody(imagesSchema)//se tiene que mandar url
router.delete('/:id/imagenes/:idImagen',invalidId, postController.deleteImageFromPost);

//Tags
router.get('/:id/tags', invalidId, postController.getTagsByPost)
router.post('/:id/tag',invalidId, postController.addTagToPost); //verificar que el nombre del tag venga en el body (middleware o schema)
router.delete('/:id/tag/:idTag',invalidId, postController.deleteTagFromPost);

//Filtros
router.get("/tag/:id", postController.getPostsByTag);
router.post("/create-imagenes", postController.createPostWithImages);
router.post("/create-tags", postController.createPostWithTags);
router.post("/create-completo", postController.createPostCompleto);

//Comentarios y Feed de Posts
router.get('/:id/comments',invalidId, postController.getCommentsByPost);
router.get('/:id/comments/lazy', invalidId, postController.getFirstTenCommentsById)
router.get('/user/:id/feed',invalidId, postController.getPostsOfFollowedUsers);

module.exports =  router ;  