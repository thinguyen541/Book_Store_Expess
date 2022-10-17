const booksRouter = require('./books');
const siteRouter = require('./site');
const cartRouter = require('./cart');
const adminRouter = require('./admin');

function route(app) {
    app.use('/books', booksRouter);
    app.use('/admin', adminRouter);
    app.use('/cart', cartRouter);
    app.use('/', siteRouter);
}

module.exports = route;
