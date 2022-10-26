const { multipleMongoose, Mongoose } = require('../../utils/mongooseToObject');
const Books = require('../../models/books');

class BooksController {
    showDetailBook(req, res, next) {
        Books.findOne({ slug: req.params.slug })
            .then((book) =>
                res.render('books/bookDetail', { book: Mongoose(book) }),
            )
            .catch(next);
    }

    showlistBook(req, res, next) {
        const books = Books.find({})
            .then((books) => {
                const bessinessBooks = books.filter(
                    (book) => book.category == 'Bessiness',
                );
                const fictionBooks = books.filter(
                    (book) => book.category == 'Fiction',
                );
                const romanceBooks = books.filter(
                    (book) => book.category == 'Romance',
                );
                const technologyBooks = books.filter(
                    (book) => book.category == 'Technology',
                );
                const advantureBooks = books.filter(
                    (book) => book.category == 'Advanture',
                );
                const allGenBooks = books.slice(0, 19);
                res.render('books/listBooksPage', {
                    allGenBooks: multipleMongoose(allGenBooks),
                    bessinessBooks: multipleMongoose(bessinessBooks),
                    fictionBooks: multipleMongoose(fictionBooks),
                    romanceBooks: multipleMongoose(romanceBooks),
                    technologyBooks: multipleMongoose(technologyBooks),
                    advantureBooks: multipleMongoose(advantureBooks),
                    user: req.user,
                });
            })
            .catch(next);
    }
}

module.exports = new BooksController();
