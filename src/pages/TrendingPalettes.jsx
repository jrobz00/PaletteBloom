import React, { useEffect, useState } from "react";
import { getFromLocalStorage } from "../utils/localStorageUtils"; // Adjust the path as needed
import { FaHeart, FaDownload } from "react-icons/fa";

const TrendingPalettes = () => {
  const [palettes, setPalettes] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  const [favoriteCounts, setFavoriteCounts] = useState(() => {
    return JSON.parse(localStorage.getItem("favoriteCounts")) || {};
  });

  // Load palettes from local storage
  useEffect(() => {
    const loadPalettes = () => {
      const userPalettes = getFromLocalStorage("palettes") || [];
      setPalettes(userPalettes);

      // Initialize favorite counts for the palettes
      setFavoriteCounts((prevCounts) => {
        const counts = { ...prevCounts };
        userPalettes.forEach((_, index) => {
          if (!(index in counts)) counts[index] = 0;
        });
        return counts;
      });
    };

    loadPalettes();
  }, []);

  // Save favorites and counts to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("favoriteCounts", JSON.stringify(favoriteCounts));
  }, [favorites, favoriteCounts]);

  // Toggle favorite status for a palette
  const toggleFavorite = (index) => {
    setFavorites((prev) => {
      const isFavorited = prev.includes(index);
      const newFavorites = isFavorited
        ? prev.filter((fav) => fav !== index)
        : [...prev, index];

      setFavoriteCounts((prevCounts) => ({
        ...prevCounts,
        [index]: isFavorited ? prevCounts[index] - 1 : prevCounts[index] + 1,
      }));

      return newFavorites;
    });
  };

  // Export a palette as a text file
  const exportPalette = (palette, index) => {
    if (!palette || !Array.isArray(palette.palette)) return;
    const paletteData = palette.palette.join(", ");
    const blob = new Blob([paletteData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `palette-${index + 1}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-5xl font-extrabold text-center mb-8 text-gray-800">
        Trending{" "}
        <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Color Palettes
        </span>
      </h1>
      <p className="text-center text-gray-600 text-lg mb-10">
        Discover vibrant color schemes or create your own and share them with
        the community!
      </p>

      {palettes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {palettes.map((palette, index) => {
            if (!palette || !Array.isArray(palette.palette)) return null; // Skip invalid palettes

            return (
              <div
                key={index}
                className="shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm"
              >
                {/* Color Palette */}
                <div className="flex">
                  {palette.palette.map((color, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-24"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>

                {/* Palette Details */}
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-2">
                    Created by:{" "}
                    <span className="font-bold">{palette.username || "Anonymous"}</span>
                  </p>
                  <div className="text-center text-gray-700 text-sm font-mono mb-4">
                    {palette.palette.join(" ")}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-bold">
                      Palette #{index + 1}
                    </span>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => exportPalette(palette, index)}
                        className="text-gray-600 hover:text-blue-600"
                        title="Export Palette"
                      >
                        <FaDownload />
                      </button>
                      <button
                        onClick={() => toggleFavorite(index)}
                        className={`text-2xl transition-colors duration-200 ${
                          favorites.includes(index)
                            ? "text-red-500"
                            : "text-gray-300"
                        } hover:text-red-500`}
                        title={
                          favorites.includes(index)
                            ? "Remove from Favorites"
                            : "Add to Favorites"
                        }
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-500">
                    {favoriteCounts[index]} favorites
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">No palettes found.</p>
      )}
    </div>
  );
};

export default TrendingPalettes;
