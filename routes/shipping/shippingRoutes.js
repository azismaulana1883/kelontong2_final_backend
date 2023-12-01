const express = require('express');
const router = express.Router();

// Import shipping controller
const shippingController = require('../../Controllers/shipping/shippingController');

// Get all shipping
router.get('/', shippingController.getAllShipping);
router.get('/:id', shippingController.getShippingById);
router.post('/', shippingController.createShipping);
router.put('/:id', shippingController.updateShippingById);
router.delete('/:id', shippingController.deleteShippingById);

module.exports = router;
