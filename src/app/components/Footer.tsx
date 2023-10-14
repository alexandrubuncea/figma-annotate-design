import React from "react";
import coffeeIcon from "../assets/icons/coffee.svg";
import "../styles/Footer.css";

const Footer = ({ onAboutClick }) => {
  return (
    <footer>
      <a
        href="https://www.buymeacoffee.com/alexandrubuncea"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-button"
      >
        <img src={coffeeIcon} />
        Buy me a coffee!
      </a>

      <button className="footer-button" onClick={onAboutClick}>
        About
      </button>
    </footer>
  );
};

export default Footer;
