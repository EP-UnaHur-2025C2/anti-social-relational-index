const {Router} = require('express');
const router = Router();
const userControllers = require('../controllers/user.controller');
const {validUser, validNickname,validEmail , validationSchemma, validationEmailSchema} = require ('../middlewares/user.midleware')
const {invalidId} = require ('../middlewares/generic.middleware');


//CRUD
router.get("/", userControllers.getUsers)
router.get('/:id',invalidId, validUser, userControllers.getUserById);
router.post('/', validationSchemma, userControllers.createUser);
router.put('/:id',invalidId, validUser, validationSchemma, userControllers.updateUser);
router.delete('/:id',invalidId, validUser, userControllers.deleteUser);

//Relaciones
router.get('/:id/posts',invalidId, validUser, userControllers.getPostsByUser);
router.get('/:id/comments',invalidId, validUser, userControllers.getCommentsByUser);

//Follow - Unfollow
router.post('/:id/follow/:idASeguir',invalidId, userControllers.followUser);// bonus
router.delete('/:id/unfollow/:idSeguido',invalidId, userControllers.unfollowUser);// bonus

//router.put('/:id/nickname',invalidId,validUser, validNickname, userControllers.updateNickName)//arreglar, hacer un midleware para que no haya un nick igual

//'/updateEmail/:id'

//Seguidores - Seguidos
router.get('/:id/seguidos',invalidId, validUser, userControllers.getSeguidos);
router.get('/:id/seguidores',invalidId, validUser, userControllers.getSeguidores);
router.get('/:id/seguidores/count',invalidId, validUser, userControllers.getCantSeguidores);
router.get('/:id/seguidos/count', invalidId, validUser, userControllers.getCantSeguidos)


module.exports =  router ;