const express = require('express');
const router = express.Router();
const OrderController = require('../Controllers/OrderController');

// Rute untuk menambahkan item baru ke dalam order
router.post('/', OrderController.addOrder);

// Rute untuk mendapatkan semua item dalam order
router.get('/', OrderController.getAllItems);

// Rute untuk mengubah item dalam order berdasarkan ID
router.put('/:id', OrderController.updateOrderItem);

// Rute untuk menghapus item dari order berdasarkan ID
router.delete('/:id', OrderController.deleteOrderItem);

module.exports = router;
