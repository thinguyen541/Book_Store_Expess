const account = require('../../models/user');
const { Mongoose, multipleMongoose } = require('../../utils/mongooseToObject');
const Cryptojs = require('crypto-js');
const Cart = require('../../models/cart');
const dotenv = require('dotenv');
const JWT = require('jsonwebtoken');
dotenv.config();

class AuthController {
    register(req, res, next) {
        res.render('auth/register', {
            old_username: req.body.username,
            old_email: req.body.email,
            emailIsUsed: 'hidden',
            isMatch: 'hidden',
        });
    }

    login(req, res, next) {
        res.render('auth/login');
    }

    async apiRegister(req, res, next) {
        const email = await account.findOne({ email: req.body.email });

        if (email) {
            res.render('auth/register', {
                old_username: req.body.username,
                old_email: '',
                emailIsUsed: '',
                isMatch: 'hidden',
            });
            return next;
        } else if (req.body.password != req.body.cpassword) {
            res.render('auth/register', {
                old_username: req.body.username,
                old_email: req.body.email,
                isMatch: '',
                emailIsUsed: 'hidden',
            });
            return next;
        }

        const newUserAccount = new account({
            username: req.body.username,
            email: req.body.email,
            isAdmin: false,
            password: Cryptojs.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC,
            ).toString(),
        });

        try {
            const newUser = await newUserAccount.save();
            res.render('auth/login');
        } catch (error) {
            console.json(error);
        }
    }

    async apiLogin(req, res, next) {
        try {
            const user = await account.findOne({ email: req.body.email });
            user || res.render('auth/login', { invalid: true });

            const hassPassword = Cryptojs.AES.decrypt(
                user.password,
                process.env.PASS_SEC,
            );
            const originalPassword = hassPassword.toString(Cryptojs.enc.Utf8);

            if (originalPassword != req.body.password)
                return res.render('auth/login', { invalid: true });

            //creat token
            const accessToken = JWT.sign(
                {
                    id: user.id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SEC,
                { expiresIn: '1d' },
            );

            //create cart
            Cart.findOne({ userid: user.id }).then((cart) => {
                if (cart === null) {
                    const newCart = new Cart({
                        userid: user.id,
                        books: [],
                    });
                    newCart.save();
                }
            });

            //cookie token
            const { password, ...others } = user._doc;
            res.cookie('token', accessToken, {
                httpOnly: true,
            });

            //direct to home
            res.redirect('/');
        } catch (error) {
            res.render('auth/login', { invalid: true });
        }
    }

    async logout(req, res, next) {
        const token = req.cookies.token;
        if (token) {
            res.clearCookie('token');
            res.redirect('/auth/login');
        } else {
            res.redirect('/');
        }
    }
}

module.exports = new AuthController();
