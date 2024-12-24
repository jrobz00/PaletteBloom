import React from "react";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const paymentLink = "https://buy.stripe.com/test_6oE16P4Q234A8XC8ww?success_url=https://palettebloom.com/success"; // Add success_url for post-payment redirect

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h1 className="checkout-title">Upgrade to Standard</h1>
        <p className="checkout-description">
          Unlock unlimited access to standard features by subscribing to the Standard Plan.
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
        <a
          href={paymentLink}
          className="checkout-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pay Now
        </a>
        <p className="checkout-note">
          After completing the payment, you'll be redirected back to confirm your access.
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;
