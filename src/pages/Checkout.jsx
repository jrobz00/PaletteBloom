import React from "react";

const Checkout = () => {
  const handlePayment = () => {
    alert("Thank you for your payment! Enjoy your standard access.");
    // Redirect or perform additional actions after payment
  };

  return (
    <div className="h-screen flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md border border-gray-300 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Confirm Your Payment
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Unlock Standard features and enjoy all the tools.
        </p>
        <div className="mb-6">
          <p className="text-gray-800 text-lg font-medium text-center">
            Standard Plan: <strong>£5.00/month</strong>
          </p>
        </div>
        <button
          onClick={handlePayment}
          className="w-full text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
          style={{ backgroundColor: "#336CED" }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
