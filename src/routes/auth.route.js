const { Router } = require('express');


const { login } = require('../controllers/auth.controller');
const userControllers = require('../controllers/user.controller');
const { validationSchema, validEmail } = require('../middlewares/user.midleware');
const { schema, schemaLogin } = require('../schemas/user.schema');
const { validNickname } = require('../middlewares/user.midleware');

const router = Router();

router.post('/login',validationSchema(schemaLogin), login);   //*Funciona
router.post('/register',validationSchema(schema), validNickname,validEmail ,userControllers.createUser); //*Funciona

module.exports = router;
