import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.');
      alert('Stripe has not loaded yet. Please try again later.');
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      console.error('CardElement not found.');
      alert('Unable to process the payment. Please try again.');
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        console.error('Payment failed:', error.message);
        alert(`Payment failed: ${error.message}. Please try again or use a different payment method.`);
        return;
      }

      console.log('Payment successful:', paymentMethod);
      alert('Payment successful! Thank you for your purchase.');
    } catch (err) {
      console.error('Unexpected error:', err.message);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const cardElementOptions = {
    hidePostalCode: true, // Optional: Hide the postal code field
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
      },
    },
    accessibilityLabel: 'Credit or debit card input', // Add accessibility label
  };

  return (
    <form onSubmit={handleSubmit}>
      <div aria-label="Payment Information">
        <CardElement options={cardElementOptions} />
      </div>
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
