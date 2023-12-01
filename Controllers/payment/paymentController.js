const Order = require('../../models/scheme/Order_detail.js');

const updateStatusOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, shipping, shipping_address } = req.body;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        order.status = status;
        order.shipping = shipping;
        order.shipping_address = shipping_address;
        await order.save();
        return res.status(200).json({
            order
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

module.exports = {
    updateStatusOrder
}