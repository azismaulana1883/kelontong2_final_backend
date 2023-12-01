const express = require('express');
const router = express.Router();
const rewardController = require('../../Controllers/settings/rewardControllers'); // Sesuaikan path dengan lokasi controller Anda

// Route untuk membuat reward baru
router.post('/', rewardController.createReward);

// Route untuk mendapatkan semua reward
router.get('/', rewardController.getAllRewards);

// Route untuk mendapatkan reward berdasarkan ID
router.get('/:id', rewardController.getRewardById);

// Route untuk mengupdate reward berdasarkan ID
router.put('/:id', rewardController.updateReward);

// Route untuk menghapus reward berdasarkan ID
router.delete('/:id', rewardController.deleteReward);

module.exports = router;
