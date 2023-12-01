// controllers/penjualan/penjualanController.js
const OrderDetail = require('../../models/scheme/Order_detail');
const Product = require('../../models/scheme/Product');

async function getDataTransaksi(req, res) {
    try {
        const { year, month } = req.query;

        const filteredData = await OrderDetail.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${year}-${month}-01`),
                        $lt: new Date(`${year}-${parseInt(month) + 1}-01`),
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    createdAt: 1,
                    total: 1,
                    products: 1,
                },
            },
        ]);

        if (filteredData.length === 0) {
            return res.status(404).send({
                message: 'Data tidak ditemukan',
                success: false,
                statusCode: 404,
            });
        }

        const result = filteredData.map((order) => ({
            _id: order._id,
            tanggal_transaksi: order.createdAt,
            jumlah_penjualan: order.products.reduce(
                (total, product) => total + product.subtotal,
                0
            ),
            total_penjualan_rp: order.total,
            jumlah_produk_terjual: order.products.reduce(
                (total, product) => total + product.qty,
                0
            ),
        }));

        res.status(200).send({
            message: 'Data ditemukan',
            success: true,
            statusCode: 200,
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saat mengambil data transaksi.');
    }
}

async function getDataBarangTerjual(req, res) {
    try {
        const { year, month } = req.query;

        const filteredData = await OrderDetail.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${year}-${month}-01`),
                        $lt: new Date(`${year}-${parseInt(month) + 1}-01`),
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    createdAt: 1,
                    products: 1,
                },
            },
        ]);

        if (filteredData.length === 0) {
            return res.status(200).send({
                message: 'Data tidak ditemukan',
                success: false,
                statusCode: 200,
            });
        }

        const result = filteredData.map((order) => ({
            _id: order._id,
            tanggal_transaksi: order.createdAt,
            barang_terjual: order.products.map((product) => ({
                nama_barang: product.name,
                kategori: product.category,
                jumlah_terjual: product.qty,
                total_penjualan_barang: product.subtotal,
            })),
        }));

        res.status(200).send({
            message: 'Data barang terjual ditemukan',
            success: true,
            statusCode: 200,
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Terjadi kesalahan saat mengambil data barang terjual.',
            success: false,
            statusCode: 500,
            error: error.message,
        });
    }
}

module.exports = {
    getDataTransaksi,
    getDataBarangTerjual,
};
