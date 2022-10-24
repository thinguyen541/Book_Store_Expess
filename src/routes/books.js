const express = require('express');
const booksController = require('../app/controllers/BooksController');
const router = express.Router();

router.get('/list-book', booksController.showlistBook);
router.get('/:slug', booksController.showDetailBook);

module.exports = router;
