const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

//slug
mongoose.plugin(slug);

const Order = new Schema(
    {
        userid: { type: String, require: true },
        books: [
            {
                bookid: { type: String, require: true },
                quatity: { type: Number, require: true, default: 1 },
            },
        ],
        amount: { type: Number, require: true },
        address: { type: String, require: true },
        status: { type: String, default: 'pending' },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Order', Order);
