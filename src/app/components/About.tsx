import React from "react";
import "../styles/About.css";
import githubLogo from "../assets/github-logo.svg";
import "../styles/Icons.css";

const About = ({ onGoBack }) => {
  return (
    <section className="about">
      <div className="about-header">
        <button id="go-back" className="btn btn-ghost" onClick={onGoBack}>
          <span className="material-symbols-rounded">arrow_back</span>
          Go back
        </button>
      </div>
      <div className="about-content">
        <h1>Hello 👋</h1>
        <p>
          Thank you for using Annotate Design! If you have any feature requests,
          improvement ideas, or if you encountered any bugs, I'd love to hear
          from you.
        </p>
        <p>
          I've built this plugin as a learning project and to speed up my design
          workflows. I hope it's useful for you too if you're using it.
        </p>
        <p>
          You can reach out to me via email at{" "}
          <a href="mailto:hello@alexandrubuncea.com">
            hello@alexandrubuncea.com
          </a>{" "}
          or via{" "}
          <a href="https://www.linkedin.com/in/alexandrubuncea" target="_blank">
            LinkedIn
          </a>
          .
        </p>
        <p>
          If you'd like to show your support you can also buy me a coffee 👇
        </p>
        <a
          href="https://ko-fi.com/alexandrub"
          className="btn get-me-a-coffee"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="material-symbols-rounded">coffee</span>
          Buy me a coffee!
        </a>
      </div>

      <a
        href="https://github.com/alexandrubuncea/figma-annotate-design"
        target="_blank"
        className="repository-link"
      >
        <div className="plugin-info">
          <div className="plugin-info-gh">
            <img src={githubLogo} />
            <p>figma-annotate-design</p>
          </div>
          <div className="plugin-info-version">
            <p>v2.0.0</p>
          </div>
        </div>
      </a>
    </section>
  );
};

export default About;
