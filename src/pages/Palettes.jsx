import React, { useState, useEffect } from "react";
import { FiSettings, FiEye, FiShuffle, FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Mock function to simulate user account status
const checkPremiumStatus = () => {
  // Replace with actual logic to determine user account status
  return false; // Change to `true` for premium account
};

// Predefined Colors - Expanded List
const predefinedColors = [
  "#FF6B6B", "#FF3D3D", "#CB6B6B", "#FF4D4D", "#C16C6C",
  // More colors...
];

// Utility Functions
const generateRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0").toUpperCase()}`;

const generateRandomPalette = () => {
  const colors = [];
  while (colors.length < 5) {
    const newColor = generateRandomColor();
    if (!colors.includes(newColor)) {
      colors.push(newColor);
    }
  }
  return colors;
};

const exportToCSS = (palette) => {
  const cssContent = palette
    .map((color, index) => `--color-${index + 1}: ${color};`)
    .join("\n");

  const blob = new Blob(
    [`:root {\n${cssContent}\n}\n\n/* Usage example: */\nbody {\n  background-color: var(--color-1);\n}`],
    { type: "text/css" }
  );
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "palette.css";
  link.click();
};

const Palettes = () => {
  const [palette, setPalette] = useState(predefinedColors.slice(0, 5));
  const [hue, setHue] = useState(0);
  const [adjustedPalette, setAdjustedPalette] = useState(palette);
  const [showQuickView, setShowQuickView] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching premium status from the backend
    setIsPremium(checkPremiumStatus());
    setAdjustedPalette(palette.map((color) => color));

    // Add event listener for spacebar
    const handleKeyDown = (event) => {
      if (event.code === "Space" && !event.repeat) {
        handleGenerateNewPalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [palette]);

  const handleRedirectToPrices = () => {
    setShowLimitPopup(false);
    navigate("/prices");
  };

  const handleGenerateNewPalette = () => {
    if (isPremium) {
      setPalette(generateRandomPalette());
    } else {
      if (usageCount < 5) {
        setPalette(generateRandomPalette());
        setUsageCount((prevCount) => prevCount + 1);
      } else {
        setShowLimitPopup(true);
      }
    }
  };

  const handleQuickView = () => {
    if (!isPremium) {
      navigate("/prices");
      return;
    }
    setShowQuickView(true);
  };

  const handleExportToCSS = () => {
    if (!isPremium) {
      navigate("/prices");
      return;
    }
    exportToCSS(adjustedPalette);
  };

  const handleCopyColor = (color) => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="text-center py-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold">
          Generate Amazing Palettes with <span className="text-blue-600">Ease!</span>
        </h1>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={handleGenerateNewPalette}
            className={`${
              isPremium || usageCount < 5 ? "text-blue-600 hover:underline" : "text-gray-400 cursor-not-allowed"
            } flex items-center space-x-2`}
          >
            <FiShuffle size={20} />
            <span>Randomize Colors</span>
          </button>
          <button
            onClick={handleQuickView}
            className={`${
              isPremium ? "text-blue-600 hover:underline" : "text-gray-400 cursor-not-allowed"
            } flex items-center space-x-2`}
          >
            <FiEye size={20} />
            <span>Quick View</span>
          </button>
          <button
            onClick={handleExportToCSS}
            className={`${
              isPremium ? "text-blue-600 hover:underline" : "text-gray-400 cursor-not-allowed"
            } flex items-center space-x-2`}
          >
            <FiDownload size={20} />
            <span>Export to CSS</span>
          </button>
        </div>
      </header>

      {/* Palette Display */}
      <div className="grid grid-cols-5 h-screen">
        {adjustedPalette.map((color, index) => (
          <div
            key={index}
            className="flex items-center justify-center text-white font-bold cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => handleCopyColor(color)}
          >
            {color}
          </div>
        ))}
      </div>

      {/* Quick View */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Quick View</h2>
            <div className="grid grid-cols-5 gap-2">
              {adjustedPalette.map((color, index) => (
                <div
                  key={index}
                  className="w-16 h-16 rounded"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <button
              onClick={() => setShowQuickView(false)}
              className="mt-4 text-blue-600 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Limit Popup */}
      {showLimitPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limit Reached</h2>
            <p className="text-gray-700 mb-6">
              You’ve reached your limit of 5 palette generations. Upgrade to premium for unlimited access!
            </p>
            <button
              onClick={handleRedirectToPrices}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Palettes;
