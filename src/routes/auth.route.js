const { Router } = require('express');


const { login } = require('../controllers/auth.controller');
const userControllers = require('../controllers/user.controller');
const { validationSchema } = require('../middlewares/user.midleware');
const { schema } = require('../schemas/user.schema');
const { validNickname } = require('../middlewares/user.midleware');

const router = Router();

router.post('/login', login);   //*Funciona
router.post('/register',validationSchema(schema), validNickname ,userControllers.createUser); //*Funciona

module.exports = router;
