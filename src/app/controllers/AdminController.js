const Book = require('../../models/books');
const { Mongoose, multipleMongoose } = require('../../utils/mongooseToObject');

class AdminController {
    addBook(req, res, next) {
        res.render('admin/addBook');
    }

    store(req, res, next) {
        const Formdata = new Book(req.body);
        Formdata.save();
        res.redirect('back');
    }
}

module.exports = new AdminController();
