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

//Route for penjualan
const penjualanRoutes = require('./penjualan/index')
routes.use('/penjualan', penjualanRoutes)

module.exports=routes
