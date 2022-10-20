const account = require('../../models/user');
const { Mongoose, multipleMongoose } = require('../../utils/mongooseToObject');

class AuthController {
   register(req, res, next) {
        res.render('auth/register');
    }

    login(req, res, next) {
        res.render('auth/login');
    }

    apiRegister(req, res, next) {
        
    }

    apiLogin(req, res, next) {
        
    }
}

module.exports = new AuthController();
