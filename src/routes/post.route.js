const {Router} = require('express');
const router = Router();
const postController = require('../controllers/post.controller');
const {invalidId} = require('../middlewares/generic.middleware');
const {validPost, validPostBody, validPostImagesBody, validPostByUser} = require('../middlewares/post.middleware');
const {creationSchema, contenidoSchema, postCompleto, postImagenes, postTags} = require('../schemas/post.schema');
const {urlSchema} = require('../schemas/postimagen.schema');
const { tagSchema, allTagsSchema } = require('../schemas/tag.schema');
const { validPostImagen, validUrl, validUrlArray} = require('../middlewares/postImagen.middleware');
const { validTag, validTagDelete } = require('../middlewares/tag.middleware');
const { validUser } = require('../middlewares/user.midleware');
//validar que el usuario exista!!!

//CRUD
router.get("/", postController.getPosts);
router.get('/:id',invalidId, validPost, postController.getPostById); //agregado del validPost
router.post('/', validPostBody(creationSchema), postController.createPost); //agregado del schema a las rutas y del validPostBody(creationSchema)
router.patch('/:id',invalidId,validPost, validPostByUser, validPostBody(contenidoSchema), postController.updatePost); //agregado del schema a las rutas, validPPost del validPostBody(contenidoSchema)
router.delete('/:id',invalidId, validPost, postController.deletePost);

//Imagenes
router.get('/:id/imagenes', invalidId, validPost, postController.getImagesByPost)
router.post('/:id/imagenes',invalidId, validPost, validUrl, validPostImagesBody(urlSchema), postController.addNewImageToPost); //validPost y validPostImagesBody(imagesSchema)//se tiene que mandar url
router.delete('/:id/imagenes/:idImagen',invalidId, validPost, validPostImagen ,postController.deleteImageFromPost);

//Tags
router.get('/:id/tags', invalidId, validPost, postController.getTagsByPost)
router.post('/:id/tag',invalidId, validPost, validPostBody(tagSchema), postController.addTagToPost); //verificar que el nombre del tag venga en el body (middleware o schema)
router.delete('/:id/tag/:idTag', invalidId, validPost, validTagDelete, postController.deleteTagFromPost);

//Filtros
router.get("/tag/:id", validTag, postController.getPostsByTag);
router.post("/create-imagenes",  validPostBody(postImagenes),validUrlArray, postController.createPostWithImages);
router.post("/create-tags", validPostBody(postTags) ,postController.createPostWithTags);
router.post("/create-completo", validPostBody(postCompleto) ,postController.createPostCompleto);

//Comentarios y Feed de Posts
router.get('/:id/comments',invalidId, validPost, postController.getCommentsByPost);
router.get('/:id/comments/lazy', invalidId, validPost, postController.getFirstTenCommentsById)
router.get('/user/:id/feed',invalidId, validUser, postController.getPostsOfFollowedUsers);

module.exports =  router ;  