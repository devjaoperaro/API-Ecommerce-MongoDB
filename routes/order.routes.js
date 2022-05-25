const orderRouter = require('express').Router();
const {verifyToken, verifyTokenAuthorization, verifyTokenAdmin} = require('./verifyToken');
const Order = require('../models/Order');

// add no pedido
orderRouter.post('/', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete pedido
orderRouter.delete('/:id', verifyTokenAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json('cart has been deleted');

    } catch (error) {
        res.status(500).json(error);
    }
});

// // update cart
orderRouter.put('/:id', verifyTokenAdmin, async (req, res) => {
    try {
        const updatedOrder = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
            },{ new: true }
        );

        res.status(200).json(updatedOrder);

    } catch (error) {
        res.status(500).json(error);
    }
});

// // get pedido do usuario
orderRouter.get('/find/:userId', verifyTokenAuthorization, async (req, res) => {
    try {
        const order = await Order.findOne({userId: req.params.userId});
        
        res.status(200).json(order);

    } catch (error) {
        res.status(500).json(error);
    }
});

//get all orders
orderRouter.get('/find', verifyTokenAdmin, async (req, res) => {
    try {
        const order = await Order.find();
        
        res.status(200).json(order);

    } catch (error) {
        res.status(500).json(error);
    }
});


// get renda mensal
orderRouter.get('/income', verifyTokenAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.getFullYear(), date.getMonth() - 1);
    const anterioresMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    console.log(anterioresMonth);
    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: anterioresMonth,
                    },
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            }
        ])
        
        res.status(200).json(income);

    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = orderRouter;