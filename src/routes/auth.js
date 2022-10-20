const express = require('express');
const authController = require('../app/controllers/AuthController');
const router = express.Router();

router.get('/register', authController.register);
router.post('/api/register', authController.apiRegister);
router.get('/login', authController.login);
router.post('/api/login', authController.apiLogin);

module.exports = router;
