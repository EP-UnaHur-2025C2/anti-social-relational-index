const {Router} = require('express');
const router = Router();
const userControllers = require('../controllers/user.controller');
const {validUser, validationSchema, validUserByParam, validUsernamePatch, validEmailPatch, validFollowUsers} = require ('../middlewares/user.middleware')
const {invalidId} = require ('../middlewares/generic.middleware');
const { authenticateToken } = require('../middlewares/authentication');

const {schema, schemaPatch} = require('../schemas/user.schema')

//router.post('/', userControllers.createUser);

//CRUD
router.get("/", userControllers.getUsers)  //*Funciona
router.get('/:id',invalidId, validUser, userControllers.getUserById); //*Funciona
//router.post('/', validationSchema(schema), validNickname, userControllers.createUser); // !Este fue movido a auth para register
router.patch('/:id',invalidId, validUser, validUsernamePatch, validEmailPatch, validationSchema(schemaPatch), userControllers.updateUser); //agregado del schema a las rutas y del validationSchema(schema)
router.delete('/:id',invalidId, validUser, userControllers.deleteUser);

//Relaciones
router.get('/:id/posts',invalidId, validUser, userControllers.getPostsByUser);
router.get('/:id/comments',invalidId, validUser, userControllers.getCommentsByUser);

//Follow - Unfollow
router.post('/:id/follow/:idASeguir',invalidId, validUser, validUserByParam("idASeguir"),validFollowUsers("id", "idASeguir"), userControllers.followUser);// bonus
router.delete('/:id/unfollow/:idSeguido',invalidId, validUser, validUserByParam("idSeguido"), validFollowUsers("id", "idSeguido"),userControllers.unfollowUser);// bonus

//Seguidores - Seguidos
router.get('/:id/seguidos',invalidId, validUser, userControllers.getSeguidos);
router.get('/:id/seguidores',invalidId, validUser, userControllers.getSeguidores);
router.get('/:id/seguidores/count',invalidId, validUser, userControllers.getCantSeguidores);
router.get('/:id/seguidos/count', invalidId, validUser, userControllers.getCantSeguidos)


module.exports =  router ;