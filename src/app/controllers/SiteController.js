const Books = require('../../models/books');
const { multipleMongoose } = require('../../utils/mongooseToObject');
class SiteController {
    index(req, res, next) {
        const books = Books.find({})
            .then((books) => {
                const bessinessBooks = books.filter(
                    (book) => (book.category == 'Bessiness'),
                )
                const fictionBooks = books.filter(
                    (book) => (book.category == 'Fiction'),
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
                const allGenBooks = books.slice(0,8);
                res.render('home', {
                    allGenBooks: multipleMongoose(allGenBooks),
                    featuredBooks: multipleMongoose(featuredBooks),
                    bessinessBooks: multipleMongoose(bessinessBooks),
                    fictionBooks: multipleMongoose(fictionBooks),
                    romanceBooks: multipleMongoose(romanceBooks),
                    technologyBooks: multipleMongoose(technologyBooks),
                    advantureBooks: multipleMongoose(advantureBooks),
                });
            })
            .catch(next);
    }
}

module.exports = new SiteController();
