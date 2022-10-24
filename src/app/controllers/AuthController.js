const account = require('../../models/user');
const { Mongoose, multipleMongoose } = require('../../utils/mongooseToObject');
const Cryptojs = require('crypto-js');
const user = require('../../models/user');
const Cart = require('../../models/cart');
const dotenv = require('dotenv')
const JWT = require('jsonwebtoken')
dotenv.config()

class AuthController {
   register(req, res, next) {
        res.render('auth/register');
    }

    login(req, res, next) {
        res.render('auth/login');
    }

    async apiRegister(req, res, next) {
        const newUserAccount = new account({
            username: req.body.username,
            email: req.body.email,
            isAdmin: false,
            password: Cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        })
        try {
            const newUser = await newUserAccount.save()
            res.json(newUser)
        } catch (error){
            console.json(error)
        }
    }

    async apiLogin(req, res, next) {
        try {
            const user = await account.findOne({email: req.body.email})
            user || res.send("wrong email")

            const hassPassword = Cryptojs.AES.decrypt(user.password,process.env.PASS_SEC)
            const originalPassword = hassPassword.toString(Cryptojs.enc.Utf8)

            originalPassword != req.body.password && res.send("wrong password")
            
            const accessToken = JWT.sign({
                id:user.id,
                isAdmin: user.isAdmin,
            }, process.env.JWT_SEC,
            {expiresIn:"7d"}
            )
            
            //create cart
            Cart.findOne({userid: user.id}).then(cart=>{
            if (cart === null){
                const newCart = new Cart({
                userid: user.id,
                books: []
            })
            newCart.save()
            }
            })

            const {password,...others} = user._doc
            res.cookie('token', accessToken,{
                httpOnly: true
            })
            res.redirect('/')
        } catch (error) {
            
        }
        
    }

    async logout(req, res, next){
        const token = req.cookies.token
        if (token) {
            res.clearCookie('token')
            res.redirect('/auth/login')
        }
        else{
           res.redirect('/')
        }
    }
}

module.exports = new AuthController();
