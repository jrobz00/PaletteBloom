import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa"; // Import icons
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./animations.css"; // Custom animations

const Prices = () => {
  const navigate = useNavigate();

  const handleChoosePlan = (plan) => {
    navigate("/checkout", { state: { plan } });
  };

  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Pricing Plans</span>
          </h2>
          <p className="text-lg text-gray-700">
            Choose a plan tailored to your needs and unlock more features.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Free Plan */}
          <div className="p-8 rounded-lg shadow-lg text-center flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-xl animate-slideUp">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Free Plan</h3>
            <p className="text-5xl font-bold text-gray-900 mb-4">
              £0<span className="text-lg font-medium">/mo</span>
            </p>
            <p className="text-gray-600 mb-6">For personal and basic use.</p>
            <ul className="text-gray-700 mb-8 space-y-2">
              <li className="flex items-center justify-center gap-2">
                <FaCheck className="text-green-500" /> Generate up to 5 palettes
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaCheck className="text-green-500" /> Copy color HEX values
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaTimes className="text-red-500" /> Export CSS
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaTimes className="text-red-500" /> Quick View feature
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaTimes className="text-red-500" /> No email support
              </li>
            </ul>
            <div className="mt-auto">
              <button
                onClick={() => handleChoosePlan("Free Plan")}
                className="inline-block bg-gray-900 text-white text-lg font-medium py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-300"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Standard Plan */}
          <div className="p-8 border-2 border-gray-900 rounded-lg shadow-lg text-center flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-xl animate-slideUp delay-150">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Standard Plan</h3>
            <p className="text-5xl font-bold text-gray-900 mb-4">
              £5.00<span className="text-lg font-medium">/mo</span>
            </p>
            <p className="text-gray-600 mb-6">Perfect for creative professionals.</p>
            <ul className="text-gray-700 mb-8 space-y-2">
              <li className="flex items-center justify-center gap-2">
                <FaCheck className="text-green-500" /> Unlimited Palette Generation
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaCheck className="text-green-500" /> Generate Palette
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaCheck className="text-green-500" /> Quick View Feature
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaCheck className="text-green-500" /> Export CSS
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaCheck className="text-green-500" /> Palette Creator
              </li>
            </ul>
            <div className="mt-auto">
              <button
                onClick={() => handleChoosePlan("Standard Plan")}
                className="inline-block bg-blue-600 text-white text-lg font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Choose Plan
              </button>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="p-8 rounded-lg shadow-lg text-center flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-xl animate-slideUp delay-300">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Premium Plan</h3>
            <p className="text-5xl font-bold text-gray-900 mb-4">
              £10.00<span className="text-lg font-medium">/mo</span>
            </p>
            <p className="text-gray-600 mb-6">For teams and businesses.</p>
            <ul className="text-gray-700 mb-8 space-y-2">
              <li className="flex items-center justify-center gap-2">
                <FaCheck className="text-green-500" /> All Standard Plan features
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaCheck className="text-green-500" /> Collaborative palette editing
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaCheck className="text-green-500" /> Priority customer support
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaCheck className="text-green-500" /> Custom export options
              </li>
              <li className="flex items-center justify-center gap-2">
                <FaCheck className="text-green-500" /> Access to exclusive templates
              </li>
            </ul>
            <div className="mt-auto">
              <button
                onClick={() => handleChoosePlan("Premium Plan")}
                className="inline-block bg-gray-900 text-white text-lg font-medium py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-300"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prices;
