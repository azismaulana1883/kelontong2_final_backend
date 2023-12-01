const express = require('express')
const router = express.Router()

// Controller
const checkoutController = require('../../Controllers/checkout/checkoutController');

// Route for checkout
router.get('/:id', checkoutController.getOrderById);

module.exports = router;