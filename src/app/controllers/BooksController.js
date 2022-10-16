class BooksController {
    showDetailBook(req, res) {
        res.render('books/bookDetail');
    }
}

module.exports = new BooksController();
