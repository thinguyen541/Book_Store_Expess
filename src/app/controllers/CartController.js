const user = require('../../models/user')
const Cart = require('../../models/cart');
const { multipleMongoose, Mongoose } = require('../../utils/mongooseToObject');
const { json } = require('express');

class CartController {
    showCart(req, res, next) {
        Cart.findOne({userid: req.user.id})
        .then(async (cart)=>{
            if(cart === null){
                const newCart = new Cart({
                    userid: req.user.id,
                    books: []
                })
                await newCart.save()
                cart = newCart
            }

            const cart_obj = Mongoose(cart)
            const books = cart_obj.books

            res.render('cart',
                {   
                    books: books,
                    total_price: books.reduce((total,book)=>total+book[0].price+book[1],0),
                }
                )})
        .catch((console.error()))
        
    }
}

module.exports = new CartController();
