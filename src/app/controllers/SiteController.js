const Books = require('../../models/books');
const { multipleMongoose } = require('../../utils/mongooseToObject');
const dotenv = require('dotenv')
dotenv.config


class SiteController {
    index(req, res, next) {
        //
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SEC , function(err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            const accountButton = document.getElementById('accountButton')
            accountButton.href = './user/' + decode.id
        });
        } else {
        req.user = undefined;
         }
      

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
                    user: req.user,
                });
            })
            .catch(next);
    }
}

module.exports = new SiteController();
