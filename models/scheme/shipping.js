const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number
    },
    duration: {
        type: String
    },
}, {timestamps: true});

const Shipping = mongoose.model('Shipping', shippingSchema);

module.exports = Shipping;