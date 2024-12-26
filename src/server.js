const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();
const stripe = Stripe("rk_test_51QYYH7L4aPeguOFLpK8eST1vf432g0knE3ZYMyXzGENzBgUQ8T260tV1fZGslZaPGUi1HlaSoSRyeaNMrsT3Bqnk00f1KuKaja");

// Middleware
app.use(cors());
app.use(express.json());

// PaymentIntent endpoint
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
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

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
