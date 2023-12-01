const Rewards = require('../../models/scheme/settings/Rewards')

// Controller untuk membuat reward baru
const createReward = async (req, res) => {
    try {
        const {
            name,
            poin,
            minPurchase,
            description,
            product_id,
            product_name,
            image
        } = req.body;

        const newRewardItem = {
            rewards: {
                name,
                poin,
                minPurchase,
                description
            },
            products: [{
                product_id,
                name: product_name,
                image
            }]
        }

        const newReward = await Rewards.create(newRewardItem);
        res.status(201).json({ message: 'item added to rewards' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller untuk mendapatkan semua reward
const getAllRewards = async (req, res) => {
    try {
        const allRewards = await Rewards.find();
        res.status(200).json(allRewards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller untuk mendapatkan reward berdasarkan ID
const getRewardById = async (req, res) => {
    try {
        const reward = await Rewards.findById(req.params.id);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json(reward);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller untuk mengupdate reward berdasarkan ID
const updateReward = async (req, res) => {
    try {
        const { name, poin, minPurchase, description, products } = req.body;
        const updatedReward = await Rewards.findByIdAndUpdate(
            req.params.id,
            { rewards: { name, poin, minPurchase, description }, products },
            { new: true }
        );
        if (!updatedReward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json(updatedReward);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller untuk menghapus reward berdasarkan ID
const deleteReward = async (req, res) => {
    try {
        const deletedReward = await Rewards.findByIdAndDelete(req.params.id);
        if (!deletedReward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.status(200).json({ message: 'Reward deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createReward,
    getAllRewards,
    getRewardById,
    updateReward,
    deleteReward,
};
