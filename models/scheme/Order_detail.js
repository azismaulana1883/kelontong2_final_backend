const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{
        product_id: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        subtotal: { type: Number, required: true }
    }],
    customer: {
        customer_id: { type: String, required: true },
        name: { type: String, required: true },
        alamat: { type: String, required: true }
    },
    total: {
        type: Number
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'cancelled'],
        default: 'pending'
    },
    shipping: { type: String },
    shipping_address: {
        type: String
    }
}, { timestamps: true });

const Order = mongoose.model('Order_detail', orderSchema);

module.exports = Order;