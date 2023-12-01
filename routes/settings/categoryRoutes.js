const express = require('express');
const router = express.Router();
const categoryController = require('../../Controllers/settings/categoryControllers');

// Endpoint untuk membuat kategori baru
router.post('/', categoryController.createCategory);

// Endpoint untuk mendapatkan semua kategori
router.get('/', categoryController.getAllCategories);

// Endpoint untuk mendapatkan satu kategori berdasarkan ID
router.get('/:id', categoryController.getCategoryById);

// Endpoint untuk mengupdate kategori berdasarkan ID
router.put('/:id', categoryController.updateCategory);

// Endpoint untuk menghapus kategori berdasarkan ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
