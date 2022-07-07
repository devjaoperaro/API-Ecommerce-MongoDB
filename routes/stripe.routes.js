const stripeRouter = require('express').Router();
const stripe = require('stripe')('sk_test_51L1VFJKuJkvv8RTRHbdR9lFzSPaDfHZNl6vf0ZUBtqNR7LSoy966JRyH43OaMEIFHWKzczjzAJLFmvzDcup6LpmD00NFUCTX2Z');

// stripeRouter.post('/payment', (req, res) => {
//     stripe.charges.create({
//         source: req.body.tokenId,
//         amount: req.body.amount,
//     }, (stripeErr, stripeRes) => {
//         if (stripeErr) {
//             res.status(500).send(stripeErr);
//         } else {
//             res.status(200).send(stripeRes);
//         }
//     });
// });
const YOUR_DOMAIN = 'http://localhost:3000';

stripeRouter.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
        {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            // price: 'price_1Gxqc9QQj1KjnL',
            price: req.body.items[0].priceId,
            quantity: req.body.items[0].quantity,
        },
        ],
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/`,
    });
    res.json({ url: session.url });
    // try {
    // } catch (error) {
    //     res.status(500).send(error);
    // }
    // const data = req.body.data;
    // res.json({ data})
    
    // console.log("asdas");
   
    // res.json({ session})
});

module.exports = stripeRouter;