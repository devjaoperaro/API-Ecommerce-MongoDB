const cartRouter = require('express').Router();
const {verifyToken, verifyTokenAuthorization, verifyTokenAdmin} = require('./verifyToken');
const Cart = require('../models/Cart');

// add no carrinho
cartRouter.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete cart
cartRouter.delete('/:id', verifyTokenAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('cart has been deleted');

    } catch (error) {
        res.status(500).json(error);
    }
});

// update cart
cartRouter.put('/:id', verifyTokenAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
            },{ new: true }
        );

        res.status(200).json(updatedCart);

    } catch (error) {
        res.status(500).json(error);
    }
});

// get user cart
cartRouter.get('/find/:userId', verifyTokenAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        
        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json(error);
    }
});

cartRouter.get('/find', verifyTokenAdmin, async (req, res) => {
    try {
        const cart = await Cart.find();
        
        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = cartRouter;