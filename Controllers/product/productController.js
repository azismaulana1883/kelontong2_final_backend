const fs = require('fs');
const path = require('path');
const Product = require('../../models/scheme/Product');
const createProduct = async (req, res) => {
    try {
        const { name, image, category, price, stock, description } = req.body;

        const product = new Product({
            name,
            image,
            category,
            price,
            stock,
            description
        });

        await product.save();

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product' });
    }
};
const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        product.name = req.body.name;
        product.image = req.body.image;
        product.category = req.body.category;
        product.price = req.body.price;
        product.stock = req.body.stock;
        product.description = req.body.description;

        await product.save();

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};
const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ code: 404, message: 'Product not found.', data: null });
        }

        const imagePath = path.join(__dirname, '..', 'assets', 'uploads', product.image);

        fs.unlink(imagePath, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ code: 500, message: 'Failed to delete image file.', data: null });
            }

            const deletedProduct = await Product.findByIdAndDelete(productId);

            res.status(200).json({ code: 200, message: 'Product and image file deleted successfully.', data: deletedProduct });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: 'Internal Server Error', data: null });
    }
};

const getTotalProducts = async (req, res) => {
    try {
        const totalProducts = await Product.find().countDocuments();

        res.status(200).json({
            message: "Get total products",
            total: totalProducts
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve total products' });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    getTotalProducts
};
