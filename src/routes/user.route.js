const {Router} = require('express');
const router = Router();
const userControllers = require('../controllers/user.controller');
const {validUser, validNickname,validEmail , validationSchema, validationEmailSchema, validUserByParam} = require ('../middlewares/user.midleware')
const {invalidId} = require ('../middlewares/generic.middleware');
const {schema, emailSchema, schemaPatch} = require('../schemas/user.schema')

//CRUD
router.get("/", userControllers.getUsers)
router.get('/:id',invalidId, validUser, userControllers.getUserById);
router.post('/', validationSchema(schema), validNickname, userControllers.createUser); //agregado del schema a las rutas, del validateNickname que antes no estaba y del validationSchema(schema)
router.patch('/:id',invalidId, validUser, validationSchema(schemaPatch), userControllers.updateUser); //agregado del schema a las rutas y del validationSchema(schema)
router.delete('/:id',invalidId, validUser, userControllers.deleteUser);

//Relaciones
router.get('/:id/posts',invalidId, validUser, userControllers.getPostsByUser);
router.get('/:id/comments',invalidId, validUser, userControllers.getCommentsByUser);

//Follow - Unfollow
router.post('/:id/follow/:idASeguir',invalidId, validUser, validUserByParam("idASeguir"),userControllers.followUser);// bonus
router.delete('/:id/unfollow/:idSeguido',invalidId, validUser, validUserByParam("idSeguido"), userControllers.unfollowUser);// bonus

//router.put('/:id/nickname',invalidId,validUser, validNickname, userControllers.updateNickName)//arreglar, hacer un midleware para que no haya un nick igual

//'/updateEmail/:id' //dejar? sacar?
router.put('/updateEmail/:id',invalidId,validUser,validEmail,validationEmailSchema(emailSchema), userControllers.updateEmail) 

//Seguidores - Seguidos
router.get('/:id/seguidos',invalidId, validUser, userControllers.getSeguidos);
router.get('/:id/seguidores',invalidId, validUser, userControllers.getSeguidores);
router.get('/:id/seguidores/count',invalidId, validUser, userControllers.getCantSeguidores);
router.get('/:id/seguidos/count', invalidId, validUser, userControllers.getCantSeguidos)


module.exports =  router ;