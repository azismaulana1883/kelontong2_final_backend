// models.js
const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    subcategories: [SubcategorySchema]
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);
const Subcategory = mongoose.model('Subcategory', SubcategorySchema);

module.exports = { Category, Subcategory };
