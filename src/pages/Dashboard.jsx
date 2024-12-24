import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  fetchPalettes,
  addPalette,
  deletePalette,
} from "../utils/localStorageUtils"; // Adjust the path as needed
import { auth } from "../firebase"; // Firebase Authentication

const Dashboard = () => {
  const [palettes, setPalettes] = useState([]); // Ensure palettes starts as an array
  const [newPalette, setNewPalette] = useState(["", "", "", "", ""]); // Five color fields
  const [username, setUsername] = useState(""); // Username for attribution
  const [errorMessage, setErrorMessage] = useState(""); // To handle and display errors
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state
  const navigate = useNavigate(); // For navigation

  // Check user authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUsername(user.displayName || "Anonymous"); // Set username from Firebase Auth
      } else {
        setIsAuthenticated(false);
        navigate("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Load palettes from local storage on component mount
  useEffect(() => {
    if (isAuthenticated) {
      try {
        const savedPalettes = fetchPalettes();
        if (Array.isArray(savedPalettes)) {
          setPalettes(savedPalettes);
        } else {
          console.warn("Invalid palettes format, resetting to empty array.");
          setPalettes([]);
        }
      } catch (error) {
        console.error("Error fetching palettes:", error);
        setPalettes([]);
      }
    }
  }, [isAuthenticated]);

  // Add a new palette
  const handleAddPalette = () => {
    // Clear any previous error messages
    setErrorMessage("");

    // Validate fields
    if (newPalette.some((color) => color.trim() === "")) {
      setErrorMessage("Please fill all color fields.");
      return;
    }

    if (!username.trim()) {
      setErrorMessage("Please enter your username.");
      return;
    }

    try {
      // Save palette to local storage
      addPalette(newPalette, username);

      // Reload palettes from local storage
      const updatedPalettes = fetchPalettes();
      setPalettes(updatedPalettes);

      // Reset fields
      setNewPalette(["", "", "", "", ""]);
    } catch (error) {
      console.error("Error adding palette:", error);
      setErrorMessage("An error occurred while adding the palette.");
    }
  };

  // Delete a palette by index
  const handleDeletePalette = (index) => {
    setErrorMessage("");

    try {
      deletePalette(index); // Remove from local storage
      const updatedPalettes = fetchPalettes(); // Reload palettes
      setPalettes(updatedPalettes);
    } catch (error) {
      console.error("Error deleting palette:", error);
      setErrorMessage("An error occurred while deleting the palette.");
    }
  };

  if (!isAuthenticated) {
    return null; // Prevent rendering until authentication status is known
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="text-center py-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold">Your Palettes</h1>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Create a New Palette</h2>
          {errorMessage && (
            <p className="text-red-600 font-medium mb-4">{errorMessage}</p>
          )}
          <div className="flex space-x-4 mb-4">
            {newPalette.map((color, index) => (
              <input
                key={index}
                type="text"
                value={color}
                onChange={(e) => {
                  const updatedPalette = [...newPalette];
                  updatedPalette[index] = e.target.value;
                  setNewPalette(updatedPalette);
                }}
                className="border border-gray-300 rounded px-2 py-1 w-20 text-center"
                placeholder="#FFFFFF"
              />
            ))}
          </div>
          <button
            onClick={handleAddPalette}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Palette
          </button>
        </div>

        {Array.isArray(palettes) && palettes.length > 0 ? ( // Ensure palettes is an array
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {palettes.map((item, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {item.username}'s Palette
                </h3>
                <div className="flex space-x-2 mb-4">
                  {Array.isArray(item.palette) &&
                    item.palette.map((color, i) => (
                      <div
                        key={i}
                        style={{ backgroundColor: color }}
                        className="w-10 h-10 rounded"
                      />
                    ))}
                </div>
                <button
                  onClick={() => handleDeletePalette(index)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No palettes found.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;