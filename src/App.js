import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import About from "./components/About";
import Features from "./components/Features";
import Prices from "./components/Prices";
import Palettes from "./pages/Palettes";
import LoginPage from "./pages/LoginPage";
import Vision from "./pages/Vision";
import Mission from "./pages/Mission";
import Support from "./pages/Support";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import TrendingPalettes from "./pages/TrendingPalettes";
import ProfileSettingsPage from "./pages/ProfileSettingsPage"; // Import ProfileSettingsPage

const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/palettes" element={<Palettes />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/support" element={<Support />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/trending-palettes" element={<TrendingPalettes />} />
            <Route path="/profile-settings" element={<ProfileSettingsPage />} /> {/* Add Profile Settings route */}
            <Route
              path="/paypal"
              element={
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Pay with PayPal</h2>
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: "10.00",
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                          alert(`Transaction completed by ${details.payer.name.given_name}`);
                          console.log("Transaction Details:", details);
                        });
                      }}
                      onError={(err) => {
                        console.error("PayPal Checkout Error:", err);
                      }}
                    />
                  </div>
                </div>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
