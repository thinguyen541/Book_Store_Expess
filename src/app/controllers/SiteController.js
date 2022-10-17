
const Books = require('../../models/books')
const {multipleMongoose}  = require('../../utils/mongooseToObject')
class SiteController {
    index(req, res, next) {
        const books = Books.find({})
        .then( (books)=>res.render('home',
        {
            books: multipleMongoose(books)
        } )
        )
        .catch(next)
    }
}

module.exports = new SiteController();
