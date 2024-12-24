import React, { useEffect } from "react";

const SuccessPage = () => {
  useEffect(() => {
    // Call an API to verify the payment and update the user's account
    fetch("https://your-backend-domain.com/verify-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: new URLSearchParams(window.location.search).get("session_id"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Payment verified. Account upgraded.");
        } else {
          console.error("Payment verification failed.");
        }
      });
  }, []);

  return (
    <div className="success-container">
      <h1>Payment Successful!</h1>
      <p>Your account has been upgraded. Enjoy your premium features!</p>
    </div>
  );
};

export default SuccessPage;
