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

// stripeRouter.post('/create-checkout-session', async (req, res) => {
//     console.log(req.body.descriProd.name[0]);
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         mode: 'subscription',
//         line_items: [
//         {
//             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//             // price: 'price_1Gxqc9QQj1KjnL',
//             price: req.body.items[0].id,
//             quantity: req.body.items[0].quantity,
//         },
//         ],
//         success_url: `${YOUR_DOMAIN}/success`,
//         cancel_url: `${YOUR_DOMAIN}/`,
//     });
//     res.json({ url: session.url });

// });

stripeRouter.post("/create-checkout-session", async (req, res) => {
    try {
      // Create a checkout session with Stripe
      console.log(req.body.descriProd.image[0]);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // For each item use the id to get it's information
        // Take that information and convert it to Stripe's format
        line_items: req.body.items.map(({ id, quantity }) => {
        //   const storeItem = storeItems.get(id)
          return {
            price_data: {
              currency: "brl",
              product_data: {
                name: req.body.descriProd.name[0],
                description: req.body.descriProd.description[0],
                images: [
                    req.body.descriProd.image[0],
                ]
              },
              unit_amount: req.body.descriProd.price[0],
            },
            quantity: quantity,
          } 
        }),
        mode: "payment",
        // Set a success and cancel URL we will send customers to
        // These must be full URLs
        // In the next section we will setup CLIENT_URL
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}`,
      })
  
      res.json({ url: session.url })
    } catch (e) {
      // If there is an error send it to the client
      res.status(500).json({ error: e.message })
    }
});

module.exports = stripeRouter;