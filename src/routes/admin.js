const express = require('express');
const adminController = require('../app/controllers/AdminController');
const userController = require('../app/controllers/UserController');
const router = express.Router();

router.get(
    '/add-a-book',
    userController.verifyTokenandAdmin,
    adminController.addBook,
);
router.post(
    '/book/store',
    userController.verifyTokenandAdmin,
    adminController.store,
);
router.put(
    '/updated/:id',
    userController.verifyTokenandAdmin,
    adminController.updateBook,
);
router.get(
    '/book-magement',
    userController.verifyTokenandAdmin,
    adminController.bookManagement,
);
router.get(
    '/:id/edit',
    userController.verifyTokenandAdmin,
    adminController.editBook,
);
router.delete(
    '/:id/delete',
    userController.verifyTokenandAdmin,
    adminController.deleteBook,
);
router.get('/', userController.verifyTokenandAdmin, adminController.index);

module.exports = router;
