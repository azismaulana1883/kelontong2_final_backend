const express = require('express');
const router = express.Router();

// Controller category
const CategoryController = require('../../Controllers/settings/categoryControllers');

// Endpoint untuk kategori
router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);

// Endpoint untuk kategori dengan subkategori
router.get('/:id', CategoryController.getCategoryWithSubcategories);
router.post('/:id/subcategories', CategoryController.createSubcategory);
router.delete('/:id', CategoryController.deleteCategory);
router.delete('/:id/subcategories/:subcategoryId', CategoryController.deleteSubcategory);
router.put('/:id', CategoryController.updateCategory);
router.put('/:id/subcategories/:subcategoryId', CategoryController.updateSubcategory);

module.exports = router;
