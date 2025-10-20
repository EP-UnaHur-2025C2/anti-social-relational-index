const { Router } = require('express');


const { login } = require('../controllers/auth.controller');
const userControllers = require('../controllers/user.controller');
const { validationSchema, validEmail } = require('../middlewares/user.middleware');
const { schema, schemaLogin } = require('../schemas/user.schema');
const { validUsername } = require('../middlewares/user.middleware');

const router = Router();

router.post('/login',validationSchema(schemaLogin), login);  
router.post('/register',validationSchema(schema), validUsername,validEmail ,userControllers.createUser); 

module.exports = router;
