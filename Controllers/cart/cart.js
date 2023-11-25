const Cart = require("../../models/scheme/Cart");

const CartController = {
    // Create: Menambahkan item baru ke Cart
    async addToCart(req, res) {
        try {
            const { product_id, customer_id, store, qty, total } = req.body;
            const cartItem = new Cart({ product_id, customer_id, store, qty, total });
            await cartItem.save();
            res.status(201).json({ message: 'Item added to cart', data: cartItem });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Read: Mendapatkan semua item dalam Cart
    async getAllItems(req, res) {
        try {
            const cartItems = await Cart.find();
            res.status(200).json({ data: cartItems });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update: Mengubah item dalam Cart berdasarkan ID
    async updateCartItem(req, res) {
        try {
            const { id } = req.params;
            const updatedItem = await Cart.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({ message: 'Item updated', data: updatedItem });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete: Menghapus item dari Cart berdasarkan ID
    async deleteCartItem(req, res) {
        try {
            const { id } = req.params;
            const deletedProduct = await Cart.findByIdAndDelete(id);
            res.status(200).json({ message: 'Item deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = CartController;