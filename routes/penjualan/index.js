const express = require('express');
const router = express.Router();

const penjualanController = require('../../Controllers/penjualan/penjualanController');

// const { verifyToken, verifyJWTToken } = require('../../middlewares/index')

// Definisi rute untuk mendapatkan data transaksi
router.get('/data_transaksi', penjualanController.getDataTransaksi);
router.get('/data_barang', penjualanController.getDataBarangTerjual);

module.exports = router;