const express = require('express');
const cartController = require('../app/controllers/CartController');
const userController = require('../app/controllers/UserController');
const router = express.Router();

router.get('/',userController.verifyToken ,cartController.showCart);

module.exports = router;
