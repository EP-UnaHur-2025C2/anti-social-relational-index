const {Router} = require('express');
const router = Router();
const userControllers = require('../controllers/user.controller');
const {validUser, validationSchema, validUserByParam, validUsernamePatch, validEmailPatch, validFollowUsers, validAuthUser} = require ('../middlewares/user.middleware')
const {invalidId} = require ('../middlewares/generic.middleware');


const {schemaPatch} = require('../schemas/user.schema')



//CRUD
router.get("/", userControllers.getUsers)  
router.get('/:id',invalidId, validUser, userControllers.getUserById);
router.patch('/:id',invalidId, validUser, validAuthUser, validUsernamePatch, validEmailPatch, validationSchema(schemaPatch), userControllers.updateUser); 
router.delete('/:id',invalidId, validUser, validAuthUser, userControllers.deleteUser);

//Relaciones
router.get('/:id/posts',invalidId, validUser, userControllers.getPostsByUser);
router.get('/:id/comments',invalidId, validUser, userControllers.getCommentsByUser);

//Follow - Unfollow
router.post('/:id/follow/:idASeguir',invalidId, validUser, validAuthUser, validUserByParam("idASeguir"),validFollowUsers("id", "idASeguir"), userControllers.followUser);
router.delete('/:id/unfollow/:idSeguido',invalidId, validUser, validAuthUser, validUserByParam("idSeguido"), validFollowUsers("id", "idSeguido"),userControllers.unfollowUser);

//Seguidores - Seguidos
router.get('/:id/seguidos',invalidId, validUser, userControllers.getSeguidos);
router.get('/:id/seguidores',invalidId, validUser, userControllers.getSeguidores);
router.get('/:id/seguidores/count',invalidId, validUser, userControllers.getCantSeguidores);
router.get('/:id/seguidos/count', invalidId, validUser, userControllers.getCantSeguidos)


module.exports =  router ;