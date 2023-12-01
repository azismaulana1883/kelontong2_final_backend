const express = require('express');
const router = express.Router();

// get Controller order
const orderController = require('../../Controllers/order/orderController');

// route
router.get('/', orderController.index);
router.post('/create-order-from-cart', orderController.createOrderFromCart);
router.post('/', orderController.store);
router.get('/by-customer', orderController.getCountCustomer);
router.get('/sold-products', orderController.getSoldProducts);
router.get('/latest-orders', orderController.getLatestOrders);
router.get('/monthly-sales', orderController.getMonthlySales);
router.get('/:id', orderController.show);
router.get('/status/:status', orderController.getOrderByStatus);

module.exports = router;
