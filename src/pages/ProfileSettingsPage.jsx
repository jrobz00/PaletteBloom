import React, { useState } from "react";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth as firebaseAuth } from "../firebase"; // Rename the imported auth

const ProfileSettingsPage = () => {
  const [name, setName] = useState(firebaseAuth.currentUser?.displayName || "");
  const [email, setEmail] = useState(firebaseAuth.currentUser?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      </div>
    </div>
  );
};

export default ProfileSettingsPage;

// Firebase Configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuQ2jlfpj7wqdrNB-VWZMrqtOt2SC4Kx0",
  authDomain: "huntmint-56203.firebaseapp.com",
  projectId: "huntmint-56203",
  storageBucket: "huntmint-56203.appspot.com",
  messagingSenderId: "1003002665283",
  appId: "1:1003002665283:web:2d0a3fa09b619b965eb7f6",
  measurementId: "G-ZGZHGGBEXS",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { app };
