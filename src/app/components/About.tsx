import React from "react";
import "../styles/About.css";
import githubLogo from "../assets/github-logo.svg";
import coffeeIcon from "../assets/icons/coffee.svg";

const About = ({ onGoBack }) => {
  return (
    <section className="about">
      <button id="go-back" className="btn btn-ghost" onClick={onGoBack}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.28033 7.71967C7.57322 8.01256 7.57322 8.48744 7.28033 8.78033L4.81066 11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H4.81066L7.28033 15.2197C7.57322 15.5126 7.57322 15.9874 7.28033 16.2803C6.98744 16.5732 6.51256 16.5732 6.21967 16.2803L2.46967 12.5303C2.17678 12.2374 2.17678 11.7626 2.46967 11.4697L6.21967 7.71967C6.51256 7.42678 6.98744 7.42678 7.28033 7.71967Z"
            fill="black"
          />
        </svg>
        Go back
      </button>
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
          href="https://www.buymeacoffee.com/alexandrubuncea"
          className="btn get-me-a-coffee"
        >
          <img src={coffeeIcon} />
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
