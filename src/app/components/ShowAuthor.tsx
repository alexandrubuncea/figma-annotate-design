import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import "../styles/ShowAuthor.css"; // Make sure to adjust the path to your CSS file

const ShowAuthor = ({ authorName, showAuthor, setShowAuthor }) => {
  return (
    <div className="show-author">
      <label>Show author</label>
      <div className="author">
        <p className="author-name">{authorName}</p>
        <ToggleSwitch isChecked={showAuthor} setIsChecked={setShowAuthor} />
      </div>
    </div>
  );
};

export default ShowAuthor;
