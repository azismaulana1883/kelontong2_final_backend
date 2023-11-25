const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    customer_id: {
        type: String,
        required: true
    },
    store: {
        type: String
    },
    qty: {
        type: Number
    },
    total: {
        type: Number
    }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
