import React from "react";
import "./CheckoutPage.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm/PaymentForm";

// Load Stripe instance
const stripePromise = loadStripe("pk_test_51QYYH7L4aPeguOFLt4XXVNJFe9rJ8ly20ZSrHDcdoSnGBWVpW3SmhhK7F6SzEfUIHuFINTmK3hyWRgw7NByHFSv4001xAqqM4f");

const CheckoutPage = () => {
  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h1 className="checkout-title">Upgrade to Standard</h1>
        <p className="checkout-description">
          Unlock unlimited access to premium features by subscribing to the Standard Plan.
        </p>
        <div className="checkout-details">
          <div className="checkout-item">
            <span>Standard Plan</span>
            <span>£5.00</span>
          </div>
          <hr />
          <div className="checkout-total">
            <strong>Total</strong>
            <strong>£5.00</strong>
          </div>
        </div>

        {/* Add Stripe Payment Form */}
        <Elements stripe={stripePromise}>
          <div className="stripe-payment-form">
            <h2 className="payment-form-title">Enter Card Details</h2>
            <PaymentForm />
          </div>
        </Elements>

        <p className="checkout-note">
          Your payment details are encrypted and secure. After completing the payment, you'll be redirected back to confirm your access.
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;
