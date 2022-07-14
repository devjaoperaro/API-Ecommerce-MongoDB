const userRouter = require('express').Router();
const {verifyToken, verifyTokenAuthorization, verifyTokenAdmin} = require('./verifyToken');
const User = require('../models/User');

// update
userRouter.put('/:id', verifyTokenAuthorization, async (req, res) => {
    if(req.body.password) {
        req.body.password = Crypto.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{ new: true });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({message: "errou aqui"});
    }
});

// delete user
userRouter.delete('/:id', verifyTokenAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('user has been deleted');

    } catch (error) {
        res.status(500).json(error);
    }
});


//get user admin
userRouter.get('/find/:id', verifyTokenAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        // desestrutura e paga as info
        const { password, ...others} = user._doc;
        
        res.status(200).json(others);

    } catch (error) {
        res.status(500).json(error);
    }
});

// get all users
userRouter.get('/find', verifyTokenAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const allUser = query ? await User.find().sort({_id: -1}).limit(5) : await User.find();

        // desestrutura e paga as info
        // const { password, ...others} = user._doc;
        
        res.status(200).json(allUser);

    } catch (error) {
        res.status(500).json(error);
    }
});

// get estatisticas usuario
userRouter.get('/stats', verifyTokenAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1))

    try {
        const data = await User.aggregate([
            //Filtra os dados do ultimo ano, primeiro estagio do pipeline/ match faz a condição onde o valor de createdAt seja maior que o valor de lastYear
            { $match: { createdAt: { $gte: lastYear } } },
            {
                //pega o valor do campo, no caso o mes/ project é para setar o valor
                $project: {
                    // $month retorna o mes de uma data
                    month: { $month: "$createdAt" },
                },
            },
            {
                //mostra a quantidade de usuarios por mes/ group é a saida do pipeline
                $group: {
                    _id: { month: "$month" },   
                    total: { $sum: 1 },
                },
            }
        ])

        // desestrutura e paga as info
        // const { password, ...others} = user._doc;
        
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = userRouter;