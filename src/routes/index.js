const booksRouter = require('./books');
const siteRouter = require('./site');

function route(app) {
    app.use('/books', booksRouter);
    app.use('/', siteRouter);
}

module.exports = route;
