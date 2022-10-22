const express = require('express');
const adminController = require('../app/controllers/AdminController');
const userController = require('../app/controllers/UserController');
const router = express.Router();

router.get('/add-a-book',userController.verifyTokenandAdmin, adminController.addBook);
router.post('/store', userController.verifyTokenandAdmin, adminController.store);

module.exports = router;
