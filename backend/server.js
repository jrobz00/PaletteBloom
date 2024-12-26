const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

require("dotenv").config(); // Load environment variables from .env

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Stripe secret key from .env

// Middleware
app.use(cors());
app.use(express.json());

// Create PaymentIntent Endpoint
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body; // Amount in cents

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
