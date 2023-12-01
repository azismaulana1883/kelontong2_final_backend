const Order_detail = require("../models/scheme/Order_detail");

const OrderController = {
    async addOrder(req, res) {
        try {
            const orderItem = Order_detail(req.body);
            await orderItem.save()
            res.status(201).json({ message: 'Item added to order', data: orderItem });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllItems(req, res) {
        try {
            const orderItems = await Order_detail.find();
            res.status(200).json({ data: orderItems });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateOrderItem(req, res) {
        try {
            const { id } = req.params;
            const updatedItem = await Order_detail.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({ message: 'Item updated', data: updatedItem });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteOrderItem(req, res) {
        try {
            const { id } = req.params;
            const deletedItem = await Order_detail.findByIdAndDelete(id);
            res.status(200).json({ message: 'Item deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = OrderController;
