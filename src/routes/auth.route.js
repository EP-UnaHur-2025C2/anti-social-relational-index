const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const userControllers = require('../controllers/user.controller');

const router = Router();

router.post('/login', login);
router.post('/register', userControllers.createUser);

module.exports = router;
