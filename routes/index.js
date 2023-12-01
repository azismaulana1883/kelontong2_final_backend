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


// routes for settings
const categoriesRoutes = require('./settings/categoryRoutes')
routes.use('/settings/categories', categoriesRoutes)

const rewardsRoutes  = require('./settings/rewardsRoutes')
routes.use('/settings/rewards', rewardsRoutes)

// Route for cart
const cartRoutes = require('./cart/cartRoutes')
routes.use('/cart', cartRoutes);

module.exports=routes
