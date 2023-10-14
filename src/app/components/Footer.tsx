import React from "react";
import "../styles/Footer.css";
import "../styles/Icons.css";

const Footer = ({ onAboutClick }) => {
  return (
    <footer>
      <a
        href="https://www.buymeacoffee.com/alexandrubuncea"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-button"
      >
        <span className="material-symbols-rounded">coffee</span>
        Buy me a coffee!
      </a>

      <button className="footer-button" onClick={onAboutClick}>
        About
      </button>
    </footer>
  );
};

export default Footer;
