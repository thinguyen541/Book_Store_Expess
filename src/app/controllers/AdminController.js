const Book = require('../../models/books');
const { Mongoose, multipleMongoose } = require('../../utils/mongooseToObject');

class AdminController {
    index(req, res, next) {
        res.render('admin/adminPage');
    }

    addBook(req, res, next) {
        res.render('admin/addBook');
    }

    store(req, res, next) {
        const Formdata = new Book(req.body);
        Formdata.save();
        res.redirect('back');
    }

    updateBook(req, res, next) {
        Book.findByIdAndUpdate(req.params.id, req.body)
            .then((book) => {
                res.redirect('/admin/book-magement');
            })
            .catch(next);
    }

    editBook(req, res, next) {
        Book.findById(req.params.id)
            .then((book) => {
                res.render('admin/editBook', {
                    book: Mongoose(book),
                });
            })
            .catch(next);
    }

    deleteBook(req, res, next) {
        Book.findByIdAndDelete(req.params.id)
            .then((book) => {
                res.redirect('back');
            })
            .catch(next);
    }

    bookManagement(req, res, next) {
        Book.find({})
            .then((books) => {
                res.render('admin/bookManagementpages', {
                    books: multipleMongoose(books),
                });
            })
            .catch(next);
    }
}

module.exports = new AdminController();
