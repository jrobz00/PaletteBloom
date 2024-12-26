import React, { useState } from "react";
import axios from "axios";

const CreatePaymentIntent = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [error, setError] = useState("");

  const handleCreatePaymentIntent = async () => {
    setError(""); // Clear any previous errors
    try {
      const response = await axios.post("/api/create-payment-intent", {
        amount: parseInt(amount) * 100, // Convert amount to cents
        currency,
      });

      setPaymentIntent(response.data); // Assume the backend returns the full PaymentIntent object
      alert("Payment Intent created successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Payment Intent</h1>

      <div>
        <label>
          Amount (e.g., 10 for $10):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </label>
      </div>

      <div>
        <label>
          Currency:
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>
        </label>
      </div>

      <button onClick={handleCreatePaymentIntent}>Create Payment Intent</button>

      {paymentIntent && (
        <div style={{ marginTop: "20px" }}>
          <h2>Payment Intent Details:</h2>
          <p>ID: {paymentIntent.id}</p>
          <p>Amount: {paymentIntent.amount / 100} {paymentIntent.currency.toUpperCase()}</p>
          <p>Status: {paymentIntent.status}</p>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <strong>Error: {error}</strong>
        </div>
      )}
    </div>
  );
};

export default CreatePaymentIntent;
