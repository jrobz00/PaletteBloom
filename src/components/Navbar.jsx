import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState(null); // Track avatar URL
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setDisplayName(user.displayName || "there");
        setPhotoURL(user.photoURL || null); // Get avatar URL
      } else {
        setIsLoggedIn(false);
        setDisplayName("");
        setPhotoURL(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClick = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  return (
    <nav className="py-2 px-6 rounded-full max-w-screen-lg mx-auto mt-6 sticky top-4 z-50 backdrop-blur-md bg-white/70 shadow-md border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-black text-xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-blue-600 transition">
            Palette<span className="text-blue-600">Bloom</span>
          </Link>
        </div>

        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
            About
          </Link>
          <button
            onClick={() => navigate("/palettes")}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Palettes
          </button>
          <button
            onClick={() => navigate("/trending-palettes")}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Trending Palettes
          </button>
          {isLoggedIn && (
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Palette Creator
            </button>
          )}
          <Link to="/prices" className="text-gray-700 hover:text-blue-600 transition">
            Prices
          </Link>
        </div>

        <div className="flex space-x-4">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => (e.target.src = "/default-avatar.png")}
                  />
                ) : (
                  <UserCircleIcon className="w-8 h-8 text-gray-700" />
                )}
                <span className="text-gray-700 font-medium">Hey, {displayName}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <button
                    onClick={() => handleDropdownClick("/profile-settings")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
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
    </nav>
  );
};

export default Navbar;
