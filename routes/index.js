
const express = require('express');
const router = express.Router();

//Route for product
const productRoutes = require('./product/productRoutes');
router.use('/products', productRoutes);

// Route for upload
const uploadRoutes = require('./upload/uploadRoutes');
router.use('/upload', uploadRoutes);

module.exports = router;
