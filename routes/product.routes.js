const productRouter = require('express').Router();
const {verifyToken, verifyTokenAuthorization, verifyTokenAdmin} = require('./verifyToken');
const Product = require('../models/Product');

// update
productRouter.post('/', verifyTokenAdmin, async (req, res) => {
    const newProject = new Product(req.body);

    try {

        const savedProduct = await newProject.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete product
productRouter.delete('/:id', verifyTokenAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('product has been deleted');

    } catch (error) {
        res.status(500).json(error);
    }
});

//update product
productRouter.put('/:id', verifyTokenAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
            },{ new: true }
        );

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json(error);
    }
});

// //get product
productRouter.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json(error);
    }
});

// // get all products
productRouter.get('/find', async (req, res) => {
    
    //criar query de parametro ex: ?new=true
    //buscar os 5 ultimos produtos
    const queryNewProducts = req.query.new

    //criar query de parametro ex: ?category=man
    //buscar por categorias
    const queryCategoryProducts = req.query.category

    try {
        let products
        if(queryNewProducts){
            products = await Product.find().sort({_id: -1}).limit(5);
        }else if(queryCategoryProducts){
            products = await Product.find({categories: {
                $in: [queryCategoryProducts]
            }});
        }else{
            products = await Product.find();
        }
        
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = productRouter;