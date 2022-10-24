const user = require('../../models/user')
const Cart = require('../../models/cart')
const Book = require('../../models/books')
const { multipleMongoose, Mongoose } = require('../../utils/mongooseToObject');

class CartController {
    showCart(req, res, next) {
        Cart.findOne({userid: req.user.id})
        .then(async (cart)=>{
            const cart_obj = Mongoose(cart)
            const books = []
            
            for(let i=0 ; i<cart_obj.books.length; i++){
                if(cart_obj.books[i])
                books.push(Mongoose( await Book.findById(cart_obj.books[i].bookid)))
            }
            
            res.render('cart/cartPage',
                {   
                    books: books,
                    total_cost: books.reduce((total,book)=>total+book.price,0),
                }
                )})
        .catch(next)
        
    }

    async addBookToCart(req, res, next) {
        const updatedcart = await Cart.findOne({userid: req.user.id})
        Book.findById(req.params.id.split('?_method')[0]).then(book=>
            {
            const book_obj = Mongoose(book) 
            
            let check = 0
            for (let i=0; i<updatedcart.books.length; i++){
                if (updatedcart.books[i] !=null && updatedcart.books[i].bookid === req.params.id.split('?_method')[0]){
                    res.render('cart/addedToCart',{book: book_obj}) 
                    check = 1      
                    break        
                }
            }
            if (check == 0){
                Cart.findOneAndUpdate({userid: req.user.id},{$push:{ books: {'bookid': book_obj._id, 'quantity':1}}},
                {new: true, safe: true, upsert: true })
                .then(
                    ()=>res.render('cart/addedToCart', {book: book_obj})
                )
                .catch(next)
            }
        }
        ) 
        .catch(next)  
    }
}

module.exports = new CartController();
