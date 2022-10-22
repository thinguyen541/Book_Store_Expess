const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router();

router.get('/profile',userController.verifyToken);
//
router.get('/:id', userController.showProfile);
//update
router.put('/:id', userController.verifyTokenandAuthorization, userController.updateUser);
//update a user
router.delete('/:id', userController.verifyTokenandAdmin, userController.deleteUser);


module.exports = router;