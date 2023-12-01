const express = require('express')
const router = express.Router()


const CartController = require('../../Controllers/cart/cart')

// Rute untuk operasi CRUD Cart
router.post('/', CartController.addToCart);
router.get('/', CartController.getAllItems);
router.put('/:id', CartController.updateCartItem);
router.delete('/:id', CartController.deleteCartItem);

module.exports = router;
