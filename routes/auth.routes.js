const authRouter = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//registro
authRouter.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

//login
authRouter.post('/login', async (req, res) => {
    try {

        //procurando usuario
        const user = await User.findOne({ username: req.body.username });
        
        // validando usuario
        !user && res.status(404).json({ message: 'User not found' }) 

        // decriptando a senha
        const decrypted = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);

        // transformando em string
        const password = decrypted.toString(CryptoJS.enc.Utf8);
        
        // validando senha
        if (password === req.body.password) {

            // gerando um token
            const accessToken = jwt.sign({
                id: user.id,
                isAdmin: user.isAdmin
            }, process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '3d' });
             
            const { password, ...others} = user._doc;

            res.status(200).json({...others, accessToken});

        }else{
            res.status(404).json({ message: 'Erro nas credenciais' });
        }

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = authRouter;