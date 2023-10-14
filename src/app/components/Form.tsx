import React, { useState } from "react";
import "../styles/Form.css"; // Make sure to adjust the path to your CSS file
import ShowAuthor from "./ShowAuthor";
import ColorPicker from "./ColorPicker";

const Form = ({ onSubmit, authorName }) => {
  const [position, setPosition] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("dark");
  const [showAuthor, setShowAuthor] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
    setError("");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);

    console.log(`Selected Theme: ${selectedTheme}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position) {
      setError("Please select a position.");
      setSubmitted(true);
      return;
    }

    if (!content) {
      setError("Please enter some content.");
      setSubmitted(true);
      return;
    }

    // Add your logic for form submission here
    onSubmit({ position, title, content, theme, showAuthor });

    // Reset form fields after submission
    setPosition("");
    setTitle("");
    setContent("");
    setError("");
    setSubmitted(false);
  };

  // Errors
  const positionError = submitted && !position && (
    <p className="error-helper-text">Please select a position</p>
  );
  const contentError = submitted && !content && (
    <p className="error-helper-text">Please enter some content</p>
  );
  const emptyContentError = contentError ? "error-border" : "";

  return (
    <section className="selected-state">
      <form className="annotation-form" onSubmit={handleSubmit}>
        <div className="position-header">
          <p className="label">Select position</p>
          {positionError}
        </div>

        <div className="top-row">
          <div className="selection-item">
            <input
              type="radio"
              name="position"
              value="top"
              id="top"
              className="selection-input"
              checked={position === "top"}
              onChange={handlePositionChange}
            />
            <label htmlFor="top" className="selection-label">
              Top<span className="arrow">↑</span>
            </label>
          </div>
        </div>

        <div className="middle-row">
          <div className="selection-item">
            <input
              type="radio"
              name="position"
              value="left"
              id="left"
              className="selection-input"
              checked={position === "left"}
              onChange={handlePositionChange}
            />
            <label htmlFor="left" className="selection-label">
              <span className="arrow">←</span> Left
            </label>
          </div>
          <div className="selection-placeholder"></div>
          <div className="selection-item">
            <input
              type="radio"
              name="position"
              value="right"
              id="right"
              className="selection-input"
              checked={position === "right"}
              onChange={handlePositionChange}
            />
            <label htmlFor="right" className="selection-label">
              Right <span className="arrow">→</span>
            </label>
          </div>
        </div>

        <div className="bottom-row">
          <div className="selection-item">
            <input
              type="radio"
              name="position"
              value="bottom"
              id="bottom"
              className="selection-input"
              checked={position === "bottom"}
              onChange={handlePositionChange}
            />
            <label htmlFor="bottom" className="selection-label">
              Bottom<span className="arrow">↓</span>
            </label>
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="title">
            Title <span className="optional">Optional</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="4"
            required
            value={content}
            onChange={handleContentChange}
            className={emptyContentError}
          ></textarea>
          {contentError}
        </div>

        <ShowAuthor
          authorName={authorName}
          showAuthor={showAuthor}
          setShowAuthor={setShowAuthor}
        />

        <ColorPicker onThemeChange={handleThemeChange} />

        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Add annotation
        </button>
      </form>
    </section>
  );
};

export default Form;
