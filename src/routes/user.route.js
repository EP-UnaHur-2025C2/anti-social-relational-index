const {Router} = require('express');
const router = Router();
const {userControllers} = require('../controllers');
const {validUser, validNickname,validEmail , validationSchemma, validationEmailSchema} = require ('../middlewares/user.midleware')
const {invalidId} = require ('../middlewares/generic.midleware')

router.get('/getUser/:id',invalidId, validUser, userControllers.getUsers);
//createUser
router.put('/updateNickName/:id',invalidId,validUser, validNickname, userControllers.updateNickName)//arreglar, hacer un midleware para que no haya un nick igual
router.post('/seguirUsuario/:id/:idASeguir',invalidId, userControllers.followUser)// bonus
//'/updateEmail/:id'
router.delete('/deleteUser/:id',invalidId,validUser, userControllers.deleteUser)


module.exports =  router ;