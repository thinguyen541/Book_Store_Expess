const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

//slug
mongoose.plugin(slug);

const Users = new Schema(
    {
        username: { type: String, min: 8, uniqe: true },
        email: { type: String, min: 8, uniqe: true },
        password: { type: string, min: 6 },
        slug: { type: String, slug: 'username' },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Users', Users);
