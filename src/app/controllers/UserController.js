const jwt = require('jsonwebtoken');
const Cryptojs = require('crypto-js');
const User = require('../../models/user');
const { Mongoose, multipleMongoose } = require('../../utils/mongooseToObject');
const dotenv = require('dotenv');
dotenv.config();

class UserController {
    verifyToken = (req, res, next) => {
        const token = req.cookies.token;
        if (token) {
            jwt.verify(token, process.env.JWT_SEC, function (err, user) {
                req.user = user;
                next();
                if (err) res.redirect('/auth/login');
            });
        } else {
            res.redirect('/auth/login');
        }
    };

    verifyTokenandAuthorization = (req, res, next) => {
        this.verifyToken(req, res, () => {
            if (req.user.id == req.param.id || req.user.isAdmin) {
                next();
            } else {
                res.json('you are not allowed to do that!');
            }
        });
    };

    verifyTokenandAdmin = (req, res, next) => {
        this.verifyToken(req, res, () => {
            if (req.user.isAdmin) {
                next();
            } else {
                res.json('you are not allowed to do that!');
            }
        });
    };

    async updateUser(req, res, next) {
        if (req.body.password) {
            req.body.password = Cryptojs.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC,
            ).toString();
        }

        //update part
        try {
            const updatedUser = await User.findOneAndUpdate(
                { id: req.params.id },
                {
                    $set: req.body,
                },
                { new: true },
                res.json(this.updateUser),
            );
        } catch (error) {
            res.json(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const deletedUser = await User.findOneAndDelete({
                id: req.params.id,
            });
            res.json('deleted this users');
        } catch (error) {
            res.json(error);
        }
    }

    showProfile(req, res, next) {
        User.findById(req.params.id).then((user) => {
            res.render('user/profile', { user: Mongoose(user) });
        });
    }
}

module.exports = new UserController();
