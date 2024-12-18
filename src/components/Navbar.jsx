import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [displayName, setDisplayName] = useState(""); // User display name
  const navigate = useNavigate();

  // Listen for authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setDisplayName(user.displayName || "there"); // Use display name or default "there"
      } else {
        setIsLoggedIn(false);
        setDisplayName("");
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign out
      setIsLoggedIn(false); // Update state
      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const handleProtectedRoute = (path) => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
    } else {
      navigate(path); // Navigate to the desired route
    }
  };

  return (
    <nav className="py-2 px-6 rounded-full max-w-screen-lg mx-auto mt-6 sticky top-4 z-50 backdrop-blur-md bg-white/70 shadow-md border border-gray-200">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-black text-xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-blue-600 transition">
            Palette<span className="text-blue-600">Bloom</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
          <button
            onClick={() => handleProtectedRoute("/palettes")}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Palettes
          </button>
          <button
            onClick={() => handleProtectedRoute("/trending-palettes")}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Trending Palettes
          </button>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 font-medium flex items-center">
                Hey, {displayName}{" "}
                <span
                  className="wave-emoji ml-1"
                  role="img"
                  aria-label="waving hand"
                >
                  👋
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="border border-gray-400 text-gray-700 px-5 py-2 rounded-full text-sm hover:text-blue-600 hover:border-blue-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="border border-gray-400 text-gray-700 px-5 py-2 rounded-full text-sm hover:text-blue-600 hover:border-blue-600 transition"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Placeholder */}
        <button className="md:hidden text-gray-700 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Wave Animation */}
      <style>
        {`
          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            50% { transform: rotate(10deg); }
            75% { transform: rotate(-10deg); }
          }

          .wave-emoji {
            display: inline-block;
            animation: wave 1.5s infinite;
            transform-origin: 70% 70%;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
