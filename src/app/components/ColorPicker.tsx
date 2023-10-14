import React, { useState } from "react";
import "../styles/ColorPicker.css"; // Make sure to adjust the path to your CSS file

const ColorPicker = ({ onThemeChange }) => {
  const [selectedColor, setSelectedColor] = useState("dark"); // Default color

  const handleColorChange = (e) => {
    const selectedTheme = presetColors.find(
      (pair) => pair.background === e.target.value
    )?.theme;

    setSelectedColor(selectedTheme);

    // Notify the parent component of the theme change
    onThemeChange(selectedTheme);

    console.log(`Selected Color: ${selectedTheme}`);
  };

  const presetColors = [
    { background: "#131314", border: "#FFFFFF26", theme: "dark" },
    { background: "#ffffff", border: "#13131421", theme: "light" },
    { background: "#F0BCBC", border: "#13131421", theme: "red" },
    { background: "#F0DEBC", border: "#13131421", theme: "yellow" },
    { background: "#BCF0D8", border: "#13131421", theme: "green" },
    { background: "#BCC5F0", border: "#13131421", theme: "purple" },
  ];
  return (
    <div className="color-picker">
      <label>Annotation Color</label>
      <div className="color-options">
        {presetColors.map((pair, index) => (
          <label key={index} className="color-option">
            <input
              type="radio"
              value={pair.background}
              checked={selectedColor === pair.theme}
              onChange={handleColorChange}
            />
            <div
              className="color-swatch"
              style={{
                backgroundColor: pair.background,
                border: `2px solid ${pair.border}`,
              }}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
