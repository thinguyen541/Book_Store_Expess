const express = require('express');
const cartController = require('../app/controllers/CartController');
const router = express.Router();

router.get('/', cartController.showCart);

module.exports = router;
