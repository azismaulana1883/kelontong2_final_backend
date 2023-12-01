const Shipping = require('../../models/scheme/shipping');

// Create all function
const getAllShipping = async (req, res) => {
    try {
        const allShipping = await Shipping.find();
        res.status(200).json(allShipping);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getShippingById = async (req, res) => {
    try {
        const { id } = req.params;
        const shipping = await Shipping.findById(id);
        if (shipping) {
            res.status(200).json(shipping);
        } else {
            res.status(404).json({ message: 'Shipping not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createShipping = async (req, res) => {
    try {
        const { name, price, duration } = req.body;
        const shipping = new Shipping({
            name,
            price,
            duration
        });
        await shipping.save();
        res.status(201).json({
            message: "Shipping created",
            data: shipping,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateShippingById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, order_id, price, duration } = req.body;
        const shipping = await Shipping.findById(id);
        if (shipping) {
            shipping.name = name;
            shipping.order_id = order_id;
            shipping.price = price;
            shipping.duration = duration;
            await shipping.save();
            res.status(200).json(shipping);
        } else {
            res.status(404).json({ message: 'Shipping not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteShippingById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Shipping.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).send("Shipping deleted");
        }
        throw new Error("Shipping not found");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllShipping,
    getShippingById,
    createShipping,
    updateShippingById,
    deleteShippingById
}