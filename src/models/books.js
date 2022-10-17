const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

//slug
mongoose.plugin(slug);

const Book = new Schema(
    {   
        title: { type: String, min: 1},
        price: {type: Number},
        category: {type: String},
        desciption:{ type: String},
        author: { type: String},
        img1: { type: String},
        img2: { type: String},
        img3: { type: String},
        slug: { type: String, slug: 'title' },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Book', Book);
