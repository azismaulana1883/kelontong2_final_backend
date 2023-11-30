const express = require('express')
const routes = express.Router()

//Auth
const Auth = require('./auth/index')
routes.use('/auth', Auth)

//Route for product
const productRoutes = require('./product/productRoutes');
routes.use('/products', productRoutes);

// Route for upload
const uploadRoutes = require('./upload/uploadRoutes');
routes.use('/upload', uploadRoutes);

// Route for checkout
const checkoutRoutes = require('./checkout/checkoutRoutes');
routes.use('/checkout', checkoutRoutes);

// Route for payment
const paymentRoutes = require('./payment/paymentRoutes');
routes.use('/payment', paymentRoutes);

// Routes for shipping
const shippingRoutes = require('./shipping/shippingRoutes');
routes.use('/shipping', shippingRoutes);

module.exports=routes
