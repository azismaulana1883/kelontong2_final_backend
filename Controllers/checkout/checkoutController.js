const User = require('../../models/scheme/User.js');
const Order = require('../../models/scheme/Order_detail.js');

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
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
    getOrderById
}