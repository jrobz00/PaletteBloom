import React, { useState } from "react";
import chroma from "chroma-js";
import {
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  ArrowDownTrayIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

// Fonts Array
const fonts = ["Arial", "Verdana", "Georgia", "Times New Roman", "Courier New", "Roboto", "Montserrat"];

// Utility function to generate a random color
const generateRandomColor = () => chroma.random().hex();

// Utility function to generate a random palette
const generateRandomPalette = () => {
  const baseColor = chroma.random();
  return chroma.scale([baseColor, baseColor.darken(2)]).colors(5);
};

const Hero = () => {
  const [palette, setPalette] = useState(generateRandomPalette());
  const [previousPalette, setPreviousPalette] = useState([]);
  const [copiedColor, setCopiedColor] = useState(null);
  const [font, setFont] = useState("Arial");
  const [endlessColor, setEndlessColor] = useState("#2563EB");
  const [palettesColor, setPalettesColor] = useState("#9333EA");

  const handleCopyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleGeneratePalette = () => {
    setPreviousPalette(palette);
    setPalette(generateRandomPalette());
  };

  const handleUndo = () => {
    if (previousPalette.length) {
      setPalette(previousPalette);
      setPreviousPalette([]);
    }
  };

  const handleDownloadPalette = () => {
    const paletteData = JSON.stringify(palette, null, 2);
    const blob = new Blob([paletteData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "palette.json";
    link.click();
  };

  const handleCopyPaletteLink = () => {
    const urlFriendlyPalette = encodeURIComponent(JSON.stringify(palette));
    navigator.clipboard.writeText(`https://yourapp.com/palette?data=${urlFriendlyPalette}`);
    alert("Palette link copied to clipboard!");
  };

  const randomizeFont = () => {
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    setFont(randomFont);
  };

  const handleRandomizeTextColors = () => {
    setEndlessColor(generateRandomColor());
    setPalettesColor(generateRandomColor());
  };

  const handleExportFont = () => {
    const blob = new Blob([`Selected Font: ${font}`], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "selected-font.txt";
    link.click();
  };

  return (
    <section className="py-16 md:py-24 bg-white" style={{ fontFamily: font }}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Left Content */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Discover{" "}
            <span style={{ color: endlessColor }} className="font-bold">
              Endless
            </span>{" "}
            <span style={{ color: palettesColor }} className="font-bold">
              Palettes
            </span>{" "}
            for Every Project
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Create stunning color palettes for your next design.
          </p>
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 flex justify-center">
          <div className="grid grid-cols-5 gap-2 w-full max-w-lg">
            {palette.map((color, index) => (
              <div
                key={index}
                onClick={() => handleCopyToClipboard(color)}
                className="relative h-24 rounded-lg shadow-md cursor-pointer group hover:scale-105 transition"
                style={{
                  background: `linear-gradient(135deg, ${chroma(color).brighten(0.5).hex()} 0%, ${color} 100%)`,
                }}
              >
                <span
                  className={`absolute inset-x-0 bottom-2 text-center text-xs text-white bg-black bg-opacity-60 px-2 py-1 rounded transition ${
                    copiedColor === color ? "opacity-100 bg-green-600" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {copiedColor === color ? "Copied!" : color}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg border flex items-center space-x-2 px-2 py-2">
        <button onClick={handleGeneratePalette} className="p-2 hover:bg-gray-100 rounded">
          <ArrowPathIcon className="w-6 h-6 text-gray-700" />
        </button>
        <button onClick={handleUndo} className="p-2 hover:bg-gray-100 rounded">
          <ArrowUturnLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
        <button onClick={handleDownloadPalette} className="p-2 hover:bg-gray-100 rounded">
          <ArrowDownTrayIcon className="w-6 h-6 text-gray-700" />
        </button>
        <button onClick={handleCopyPaletteLink} className="p-2 hover:bg-gray-100 rounded">
          <LinkIcon className="w-6 h-6 text-gray-700" />
        </button>
        <button onClick={randomizeFont} className="px-3 py-2 hover:bg-gray-100 rounded">
          Fonts +
        </button>
        <button onClick={handleRandomizeTextColors} className="px-3 py-2 hover:bg-gray-100 rounded">
          Text Colors
        </button>
        <button onClick={handleExportFont} className="px-3 py-2 hover:bg-gray-100 rounded">
          Export Font
        </button>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
        Why Palette<span style={{ color: "#2463EB" }}>Bloom</span>
        <span style={{ color: "black" }}>?</span>
      </h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* Saves Time */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <div className="relative w-12 h-12 mx-auto mb-4 border-4 border-black rounded-full flex items-center justify-center">
            <div className="absolute w-1 h-5 bg-black rounded transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 origin-bottom clock-hand hour"></div>
            <div className="absolute w-1 h-3 bg-black rounded transform -translate-x-1/2 -translate-y-1/2 rotate-45 top-1/2 left-1/2 origin-bottom clock-hand minute"></div>
            <div className="absolute w-2 h-2 bg-black rounded-full"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 underline decoration-purple-500">Saves Time</h3>
          <p className="text-gray-600">No need to spend hours implementing different variations of colors. Decide right away and achieve stunning results with minimal effort.</p>
        </div>

        {/* It's Realistic */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-1 w-12 h-12 mx-auto mb-4">
            <div className="bg-black"></div>
            <div className="bg-purple-500"></div>
            <div className="bg-gray-300"></div>
            <div className="bg-white border"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 underline decoration-purple-500">It’s Realistic</h3>
          <p className="text-gray-600">This tool distributes the colors on a real website, showcasing how they would look in a practical design environment for better visualization.</p>
        </div>

        {/* It's Simple */}
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <div className="w-12 h-12 mx-auto mb-4 bg-purple-500 rounded flex items-center justify-center">
            <span className="text-white text-lg font-bold">✓</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 underline decoration-purple-500">It’s Simple</h3>
          <p className="text-gray-600">Push a few buttons, and you have your branding colors ready to export, streamlining your workflow and saving valuable time.</p>
        </div>
      </div>
    </section>
  );
};



const App = () => (
  <>
    <Hero />
    <FeaturesSection />
  </>
);

export default App;
