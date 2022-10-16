const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/book_store_dev');
        console.log('connect database successfully!');
    } catch (error) {
        console.log('connect database fail!');
    }
}

module.exports = connect;
