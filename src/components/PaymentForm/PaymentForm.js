import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");

    if (!stripe || !elements) {
      console.log("Stripe.js has not loaded yet");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch("http://localhost:4000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500 }), // Amount in cents
      });

      if (!response.ok) {
        throw new Error("Failed to create PaymentIntent");
      }

      const { clientSecret } = await response.json();
      console.log("Client secret:", clientSecret);

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.error("[Payment Error]", error);
        alert("Payment failed. Please try again.");
      } else {
        console.log("Payment Successful");
        alert("Payment successful!");
      }
    } catch (error) {
      console.error("[Server Error]", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
