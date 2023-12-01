const Order = require('../../models/scheme/Order_detail');

// get all data
const index = async (req, res) => {
    try {
        const order = await Order.find();
        res.status(200).json({
            message: "Get all data",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

// create new data
const store = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(200).json({
            message: "Data created",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

// get single data
const show = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json({
            message: "Get single data",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

// get data by status
async function getOrderByStatus(req, res) {
    try {
        const { status } = req.params;
        const order = await Order.find({ status: status }).countDocuments();
        if (!order) {
            return res.status(404).json({
                message: "Data not found"
            });
        }
        res.status(200).json({
            message: "Get data order paid",
            total: order
        });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

async function getCountCustomer(req, res) {
    try {
        const result = await Order.aggregate([
            {
                $match: {
                    status: 'paid'
                }
            },
            {
                $group: {
                    _id: '$customer.customer_id',
                    count: { $sum: 1 },
                    customerData: { $first: '$customer' }
                }
            },
            {
                $group: {
                    _id: null,
                    totalCustomers: { $sum: 1 },
                    uniqueCustomers: { $push: '$$ROOT' }
                }
            }
        ]);

        res.json({ totalCustomers: result.length > 0 ? result[0].totalCustomers : 0, uniqueCustomers: result.length > 0 ? result[0].uniqueCustomers : [] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getSoldProducts(req, res) {
    const result = await Order.aggregate([
        { $match: { status: 'paid' } },
        { $unwind: '$products' },
        {
            $group: {
                _id: '$products.product_id',
                product: { $first: '$products.name' },
                sold: { $sum: '$products.qty' }
            }
        },
        { $sort: { sold: -1 } },
        { $limit: 5 }
    ]);

    res.json(result);
};

async function getLatestOrders(req, res) {
    try {
        const orders = await Order.find({})
            .sort({ createdAt: -1 })
            .limit(5);

        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Could not retrieve latest orders', error: err });
    }
};

async function getMonthlySales(req, res) {
    const currentYear = new Date().getFullYear();

    try {
        const result = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lt: new Date(`${currentYear + 1}-01-01`)
                    },
                    status: 'paid'
                }
            },
            {
                $group: {
                    _id: { month: { $month: '$createdAt' } },
                    totalSales: { $sum: '$total' }
                }
            },
            { $sort: { '_id.month': 1 } }
        ]);

        // res.json(result);
        const totalSales = result.map(item => item.totalSales);

        res.json(totalSales);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Could not retrieve monthly sales', error: err });
    }
};

module.exports = {
    index,
    store,
    show,
    getOrderByStatus,
    getCountCustomer,
    getSoldProducts,
    getLatestOrders,
    getMonthlySales
}
