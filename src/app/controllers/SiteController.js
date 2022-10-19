const Books = require('../../models/books');
const { multipleMongoose } = require('../../utils/mongooseToObject');
class SiteController {
    index(req, res, next) {
        const books = Books.find({})
            .then((books) => {
                const bessinessBooks = books.filter(
                    (book) => (book.category == 'Bessiness'),
                )
                const frictionBooks = books.filter(
                    (book) => (book.category == 'Friction'),
                );
                const romanceBooks = books.filter(
                    (book) => (book.category == 'Romance'),
                );
                const technologyBooks = books.filter(
                    (book) => (book.category == 'Technology'),
                );
                const advantureBooks = books.filter(
                    (book) => (book.category == 'Advanture'),
                );
                const featuredBooks = books.slice(0, 4);
                res.render('home', {
                    books: multipleMongoose(books),
                    featuredBooks: multipleMongoose(featuredBooks),
                    bessinessBooks: multipleMongoose(bessinessBooks),
                    frictionBooks: multipleMongoose( frictionBooks),
                    romanceBooks: multipleMongoose(romanceBooks),
                    technologyBooks: multipleMongoose(technologyBooks),
                    advantureBooks: multipleMongoose(advantureBooks),
                });
            })
            .catch(next);
    }
}

module.exports = new SiteController();
