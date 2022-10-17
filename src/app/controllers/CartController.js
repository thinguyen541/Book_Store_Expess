class CartController {
    showCart(req, res) {
        res.render('cart');
    }
}

module.exports = new CartController();
