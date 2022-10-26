const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config;

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connect database successfully!');
    } catch (error) {
        console.log('connect database fail!');
    }
}

module.exports = connect;
