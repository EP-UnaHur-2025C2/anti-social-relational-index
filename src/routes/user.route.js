const {Router} = require('express');
const router = Router();
const userControllers = require('../controllers/user.controllers');
const {validUser, validNickname,validEmail , validationSchemma, validationEmailSchema} = require ('../middlewares/user.midleware')
const {invalidId} = require ('../middlewares/generic.middleware');



router.get("/", userControllers.getUsers)

router.get('/:id',invalidId, validUser, userControllers.getUserById);
//createUser
//router.put('/:id/nickname',invalidId,validUser, validNickname, userControllers.updateNickName)//arreglar, hacer un midleware para que no haya un nick igual
router.post('/:id/follow/:idASeguir',invalidId, userControllers.followUser)// bonus
//'/updateEmail/:id'
router.delete('/:id',invalidId,validUser, userControllers.deleteUser)


module.exports =  router ;