import React from "react";
import illustration from "../assets/empty-state.svg";
import "../styles/EmptyState.css";

const EmptyState = () => {
  return (
    <div className="empty-state-container">
      <img src={illustration} />
      <p className="empty-state-text">
        Select the element you want to annotate
      </p>
    </div>
  );
};

export default EmptyState;
