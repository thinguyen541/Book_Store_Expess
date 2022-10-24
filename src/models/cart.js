const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

//slug
mongoose.plugin(slug);

const Cart = new Schema(
    {
        userid: { type: String, require: true },
        books: [
            {
                bookid: { type: String, require: true },
                quantity: { type: Number, require: true, default: 1 },
            },
        ],
    },
    { timestamps: true },
);

module.exports = mongoose.model('Cart', Cart);
