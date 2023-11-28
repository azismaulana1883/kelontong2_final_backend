// controllers/penjualan/penjualanController.js

// Contoh struktur objek untuk data order_details
const orderDetailData = [
  {
    _id: "65649a723b3d021871868aed",
    products: [
      {
        product_id: "655f0202a0df4ccd2f7fec18",
        name: "beras mantap-mantap",
        image: "https://image.dailymartazzahra.com/s3/productimages/webp/co37129/p1025083/w600-h600/bf472756-c5a8-4aa4-8176-039facfcde82.png",
        category: "beras",
        price: 17000,
        qty: 2,
        subtotal: 34000
      }
    ],
    customer: {
      customer_id: "655e0b8e95e2be68773e1c17",
      name: "Annisa",
      phone_number: "082213221253",
      alamat: "Limo, depok"
    },
    total: 34000,
    createdAt: "2023-11-27T03:28:46.538Z",
    updatedAt: "2023-11-27T03:28:46.538Z"
  }
];

// Controller untuk mendapatkan data transaksi
async function getDataTransaksi(req, res) {
  try {
    // Mendapatkan parameter bulan dan tahun dari query
    const { year, month } = req.query;

    // Menggunakan agregasi untuk menghitung data transaksi
    const filteredData = orderDetailData
      .filter(order => {
        const orderDate = new Date(order.createdAt);
        return (
          (!year || orderDate.getFullYear() == year) &&
          (!month || orderDate.getMonth() + 1 == month)
        );
      });

    // Jika tidak ada data yang cocok, kirim respons "Data tidak ditemukan"
    if (filteredData.length === 0) {
      return res.status(404).send({ 
         message: 'Data tidak ditemukan',
        success: false,
        statusCode: 404
    });
    }

    const result = filteredData.map(order => ({
      _id: order._id,
      tanggal_transaksi: order.createdAt,
      jumlah_penjualan: order.products.reduce((total, product) => total + product.subtotal, 0),
      total_penjualan_rp: order.total,
      jumlah_produk_terjual: order.products.reduce((total, product) => total + product.qty, 0)
    }));

    // Mengembalikan data transaksi sebagai respons
    res.status(200).send({
        message : "Data ditemukan",
        sucess : true,
        statusCode : 200,
        data : result
    })
  } catch (error) {
    // Menangani kesalahan dan memberikan respons yang sesuai
    console.error(error);
    res.status(500).send('Error saat mengambil data transaksi.');
  }
}

module.exports = {
  getDataTransaksi,
};
