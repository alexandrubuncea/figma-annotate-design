import React from "react";
import "../styles/ToggleSwitch.css";

const ToggleSwitch = ({ isChecked, setIsChecked }) => {
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="toggle-switch-box">
      <label className="toggle-switch">
        <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
