export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

export const fetchPalettes = () => getFromLocalStorage("palettes");

export const addPalette = (palette, username) => {
  const palettes = fetchPalettes();
  palettes.push({ palette, username });
  saveToLocalStorage("palettes", palettes);
};

export const deletePalette = (index) => {
  const palettes = fetchPalettes();
  if (index >= 0 && index < palettes.length) {
    palettes.splice(index, 1);
    saveToLocalStorage("palettes", palettes);
  }
};
