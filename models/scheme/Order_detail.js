const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    products: [
        {
            product_id: {type: String, require: true},
            name: {type: String, require: true},
            image: {type: String, require: true},
            category: {type: String, require: true},
            price: {type: Number, require: true},
            qty: {type: Number, require: true},
            subtotal: {type: Number, require: true}
        }
    ],
    customer: {
        customer_id: {type: String, require: true},
        name: {type: String, require: true},
        phone_number: {type: String, require: true},
        alamat: {type: String, require: true}
    },
    total: {type: Number, require: true},
    status: {type: String}
}, {timestamps: true})

const Order_detail = mongoose.model('Order_detail', orderSchema);

module.exports = Order_detail;