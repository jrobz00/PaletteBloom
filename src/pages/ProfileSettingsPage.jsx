import React, { useState } from "react";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth as firebaseAuth } from "../firebase"; // Rename the imported auth

const ProfileSettingsPage = () => {
  const [name, setName] = useState(firebaseAuth.currentUser?.displayName || "");
  const [email, setEmail] = useState(firebaseAuth.currentUser?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [invoiceId, setInvoiceId] = useState(""); // New state for Invoice ID
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (firebaseAuth.currentUser) {
        if (name && name !== firebaseAuth.currentUser.displayName) {
          await updateProfile(firebaseAuth.currentUser, { displayName: name });
        }
        if (email && email !== firebaseAuth.currentUser.email) {
          await updateEmail(firebaseAuth.currentUser, email);
        }
        if (newPassword) {
          await updatePassword(firebaseAuth.currentUser, newPassword);
        }
        setSuccess("Profile updated successfully!");
      } else {
        setError("No authenticated user found.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Invoice ID submission
  const handleVerifyInvoice = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await fetch("https://your-backend-domain.com/verify-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoiceId }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Invoice verified! Your account has been upgraded.");
      } else {
        setError("Invalid or unpaid invoice. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while verifying the invoice.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 space-y-6 shadow-lg rounded-lg bg-white">
        <h1 className="text-2xl font-bold text-center text-gray-900">Profile Settings</h1>

        <form className="space-y-4" onSubmit={handleUpdateProfile}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter a new password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center">{success}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Save Changes
          </button>
        </form>

        {/* Invoice Verification */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Upgrade Your Account</h2>
          <label htmlFor="invoice-id" className="block text-sm font-medium text-gray-700">
            Enter Your Invoice ID
          </label>
          <input
            id="invoice-id"
            type="text"
            value={invoiceId}
            onChange={(e) => setInvoiceId(e.target.value)}
            placeholder="Enter your Invoice ID"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
          />
          <button
            onClick={handleVerifyInvoice}
            className="w-full text-white px-4 py-2 rounded-lg font-medium transition duration-300"
            style={{ backgroundColor: "#2463EB" }}
          >
            Verify Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
