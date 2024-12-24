const express = require("express");
const Stripe = require("stripe");

const app = express();
const stripe = Stripe("your_secret_key_here"); // Replace with your Stripe Secret Key

app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
    const { amount } = req.body; // Amount is expected in cents (e.g., $10 = 1000)

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents
            currency: "usd", // Replace with your preferred currency
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
