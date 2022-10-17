const express = require('express');
const adminController = require('../app/controllers/AdminController');
const router = express.Router();

router.get('/add-a-book', adminController.addBook);
router.post('/store', adminController.store);

module.exports = router;
