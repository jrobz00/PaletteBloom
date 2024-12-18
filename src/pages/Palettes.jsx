import React, { useState, useEffect } from "react";
import { FiSettings, FiEye, FiShuffle } from "react-icons/fi";
import { HslColorPicker } from "react-colorful";

// Predefined Colors - Expanded List
const predefinedColors = [
  // Reds
  "#FF6B6B", "#FF3D3D", "#CB6B6B", "#FF4D4D", "#C16C6C",
  "#FF3333", "#C70000", "#900C0C", "#581818", "#FF0000",
  "#DC143C", "#B22222", "#FF1C1C", "#A52A2A", "#FF6347",

  // Oranges
  "#FF5733", "#FF9F1C", "#E67E22", "#FFB347", "#FC4A1A",
  "#F28500", "#FF914D", "#FF4500", "#E04040", "#D2691E",

  // Yellows
  "#FFD93D", "#F3FF33", "#FFC300", "#FFD700", "#FFDD57",
  "#FFEA00", "#F1C40F", "#FFF44F", "#FFEC8B", "#F9E79F",

  // Greens
  "#6BCB77", "#2ECC71", "#00FF7F", "#40D89F", "#7CFC00",
  "#00FF00", "#ADFF2F", "#2E8B57", "#228B22", "#32CD32",
  "#90EE90", "#98FB98", "#66CDAA", "#8FBC8F", "#3CB371",

  // Blues
  "#4D96FF", "#1E90FF", "#00BFFF", "#3498DB", "#87CEEB",
  "#4682B4", "#00CED1", "#5DADE2", "#6495ED", "#4169E1",
  "#4682B4", "#87CEFA", "#00A5FF", "#1CA3EC", "#ADD8E6",

  // Purples
  "#A56CC1", "#8C33FF", "#9400D3", "#9932CC", "#6A0572",
  "#8B008B", "#9370DB", "#BA55D3", "#DA70D6", "#800080",
  "#C71585", "#D8BFD8", "#E6E6FA", "#DDA0DD", "#EE82EE",

  // Pinks
  "#FF69B4", "#FF33F6", "#F06292", "#EC407A", "#F48FB1",
  "#FF77A9", "#FF1493", "#FFC0CB", "#FFD1DC", "#FA8072",
  "#E91E63", "#FFB6C1", "#DB7093", "#F4A7B9", "#D87093",

  // Aquas and Teals
  "#33FFF6", "#40E0D0", "#7FFFD4", "#00FFFF", "#00CED1",
  "#48D1CC", "#76D7C4", "#AFEEEE", "#20B2AA", "#5F9EA0",
  "#00FA9A", "#66CCCC", "#8FDDE7", "#008B8B", "#2F4F4F",

  // Neutrals and Grays
  "#696969", "#A9A9A9", "#B0C4DE", "#D3D3D3", "#C0C0C0",
  "#808080", "#DCDCDC", "#F5F5F5", "#E0E0E0", "#FFFFFF",
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

const Palettes = () => {
  const [palette, setPalette] = useState(predefinedColors.slice(0, 5));
  const [hue, setHue] = useState(0);
  const [adjustedPalette, setAdjustedPalette] = useState(palette);
  const [showQuickView, setShowQuickView] = useState(false);

  useEffect(() => {
    setAdjustedPalette(palette.map((color) => color));
  }, [palette]);

  const generateNewPalette = () => setPalette(generateRandomPalette());

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
            onClick={generateNewPalette}
            className="text-blue-600 hover:underline flex items-center space-x-2"
          >
            <FiShuffle size={20} />
            <span>Randomize Colors</span>
          </button>
          <button
            onClick={() => setShowQuickView(true)}
            className="text-blue-600 hover:underline flex items-center space-x-2"
          >
            <FiEye size={20} />
            <span>Quick View</span>
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
    </div>
  );
};

export default Palettes;
