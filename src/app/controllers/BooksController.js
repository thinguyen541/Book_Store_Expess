const { Mongoose } = require('../../utils/mongooseToObject');
const Books = require('../../models/books');

class BooksController {
    showDetailBook(req, res, next) {
        Books.findOne({ slug: req.params.slug })
            .then((book) =>
                res.render('books/bookDetail', { book: Mongoose(book) }),
            )
            .catch(next);
    }
}

module.exports = new BooksController();
