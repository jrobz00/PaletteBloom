import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "A password reset link has been sent to your email address. Please check your inbox."
      );
    } catch (err) {
      setError("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="text-3xl font-extrabold text-gray-900">
            Hunt<span className="text-blue-600">Mint</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            Enter your email address to reset your password
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleForgotPassword}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
            />
          </div>

          {/* Success or Error Message */}
          {message && <p className="text-green-600 text-sm text-center">{message}</p>}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>

        {/* Divider */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Remembered your password?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
