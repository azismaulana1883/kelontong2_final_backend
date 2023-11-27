const { Category, Subcategory } = require('../../models/scheme/settings/Category');

const CategoryController = {
    // Create a new category
    async createCategory(req, res) {
        try {
            const { name } = req.body;
            const newCategory = new Category({ name });
            await newCategory.save();
            res.status(201).json({ message: 'Category created', data: newCategory });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Create a new subcategory for a specific category
    async createSubcategory(req, res) {
        try {
            const categoryId = req.params.id;
            const { subcategory_id, name } = req.body;

            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            const newSubcategory = new Subcategory({ subcategory_id, name });
            category.subcategories.push(newSubcategory);
            await category.save();
            res.status(201).json({ message: 'Subcategory created', data: newSubcategory });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get all categories with their subcategories
    async getAllCategories(req, res) {
        try {
            const categories = await Category.find().populate('subcategories');
            res.status(200).json({ data: categories });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get a specific category with its subcategories
    async getCategoryWithSubcategories(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const category = await Category.findById(categoryId).populate('subcategories');
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json({ data: category });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a category
    async deleteCategory(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            await Category.findByIdAndDelete(categoryId);
            res.status(200).json({ message: 'Category deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a subcategory from a category
    async deleteSubcategory(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const subcategoryId = req.params.subcategoryId;

            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            category.subcategories.pull({ _id: subcategoryId });
            await category.save();
            res.status(200).json({ message: 'Subcategory deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a category
    async updateCategory(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const { name } = req.body;

            const category = await Category.findByIdAndUpdate(categoryId, { name }, { new: true });
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json({ message: 'Category updated', data: category });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update a subcategory
    async updateSubcategory(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const subcategoryId = req.params.subcategoryId;
            const { name } = req.body;

            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            const subcategory = category.subcategories.id(subcategoryId);
            if (!subcategory) {
                return res.status(404).json({ message: 'Subcategory not found' });
            }

            subcategory.name = name;
            await category.save();
            res.status(200).json({ message: 'Subcategory updated', data: subcategory });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = CategoryController;
