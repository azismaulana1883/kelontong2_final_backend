const { Category } = require('../../models/scheme/settings/Category');

// Controller untuk membuat kategori baru
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller untuk mendapatkan semua kategori
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller untuk mendapatkan satu kategori berdasarkan ID
const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        
        if (!category) {
            return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        }
        
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller untuk mengupdate kategori berdasarkan ID
const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name }, { new: true });
        
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        }
        
        res.status(200).json(updatedCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller untuk menghapus kategori berdasarkan ID
const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        }
        
        res.status(200).json({ message: 'Kategori berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
