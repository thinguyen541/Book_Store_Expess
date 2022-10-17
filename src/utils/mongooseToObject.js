module.exports = {
    multipleMongoose: (mgs) => mgs.map((mg) => mg.toObject()),
    Mongoose: (mg) => (mg ? mg.toObject() : mg),
};
