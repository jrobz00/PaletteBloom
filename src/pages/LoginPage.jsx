import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import party from "party-js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");
    const savedRemember = localStorage.getItem("rememberMe");

    if (savedRemember === "true") {
      setEmail(savedEmail || "");
      setPassword(savedPassword || "");
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
        localStorage.removeItem("rememberMe");
      }

      const isFirstLogin = localStorage.getItem(`isFirstLogin_${userCredential.user.uid}`) === null;

      if (isFirstLogin) {
        localStorage.setItem(`isFirstLogin_${userCredential.user.uid}`, "false");
        setShowWelcomeModal(true);

        setTimeout(() => {
          const modalElement = document.querySelector("#welcome-modal");
          if (modalElement) {
            party.confetti(modalElement, {
              count: party.variation.range(80, 120),
              spread: 100,
            });
          }
        }, 500);
      } else {
        navigate("/palettes");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleWelcomeModalClose = () => {
    setShowWelcomeModal(false);
    navigate("/palettes");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 shadow-lg rounded-lg bg-white">
        <div className="text-center">
          <Link to="/" className="text-3xl font-extrabold text-gray-900">
            Palette<span className="text-blue-600">Bloom</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">Log in to access your account</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-900"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        <div className="text-center">
          <span className="text-sm text-gray-500">Don't have an account?</span>{" "}
          <Link to="/signup" className="text-sm font-medium text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div
          id="welcome-modal"
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome Back!</h2>
            <p className="text-gray-700 mb-6">
              We're excited to have you back on PaletteBloom! Explore amazing palettes and unleash your creativity.
            </p>
            <button
              onClick={handleWelcomeModalClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Let’s Go!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
