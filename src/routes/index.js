const booksRouter = require('./books');
const siteRouter = require('./site');
const cartRouter = require('./cart');
const adminRouter = require('./admin');
const authRouter = require('./auth');
const userRouter = require('./user');

function route(app) {
    app.use('/books', booksRouter);
    app.use('/admin', adminRouter);
    app.use('/auth', authRouter);
    app.use('/cart', cartRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);
}

module.exports = route;
