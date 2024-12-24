import React, { useEffect, useState } from "react";

const SuccessPage = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Replace with your backend endpoint
    const verifyPayment = async () => {
      try {
        const sessionId = new URLSearchParams(window.location.search).get("session_id");
        const response = await fetch("https://your-backend-domain.com/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();
        if (data.success) {
          setMessage("Payment verified! Your account has been upgraded.");
        } else {
          setMessage("Payment verification failed. Please contact support.");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setMessage("An error occurred while verifying your payment.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="success-container">
      <h1>{loading ? "Verifying Payment..." : message}</h1>
    </div>
  );
};

export default SuccessPage;
