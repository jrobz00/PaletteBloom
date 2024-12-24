const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_51QGpPmAl1I1xEdBDl5f3oeWv6ykayNT87oi38EihVknk2YEZigsk2tnvQUYPrwm14d8YQDsSYPgS9STA03F5w7py00KBU3wEtb"); // Replace with your Stripe Secret Key
const cors = require("cors"); // Import CORS middleware

// Initialize CORS middleware
const corsMiddleware = cors({
  origin: true, // Allow all origins during development
  methods: ["GET", "POST", "OPTIONS"], // Allow these methods
  allowedHeaders: ["Content-Type"], // Allow these headers
});

exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  corsMiddleware(req, res, async () => {
    if (req.method === "OPTIONS") {
      // Handle preflight OPTIONS request
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      return res.status(204).send(""); // No content for OPTIONS requests
    }

    if (req.method !== "POST") {
      return res.status(405).send({ error: "Method Not Allowed" });
    }

    try {
      const { items, successUrl, cancelUrl } = req.body;

      // Create a Stripe Checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: { name: item.name },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send({ id: session.id });
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      res.set("Access-Control-Allow-Origin", "*");
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
});
