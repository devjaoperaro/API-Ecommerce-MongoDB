const routes = require('express').Router();

const userRouter = require('../routes/user.routes');
const cartRouter = require('../routes/cart.routes');
const orderRouter = require('../routes/order.routes');
const productRouter = require('../routes/product.routes');
const authRouter = require('../routes/auth.routes');
const stripeRouter = require('../routes/stripe.routes');

routes.use('/auth', authRouter);
routes.use('/checkout', stripeRouter);
routes.use('/user', userRouter);
routes.use('/products', productRouter);
routes.use('/cart', cartRouter);
routes.use('/order', orderRouter);

module.exports = routes;
