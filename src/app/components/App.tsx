import React, { useState } from "react";
import Form from "./Form";
import Footer from "./Footer";
import EmptyState from "./EmptyState";
import About from "./About";
import "../styles/ui.css";

function App() {
  const [showAbout, setShowAbout] = useState(false); // Add state for showing About section

  const handleAboutClick = () => {
    setShowAbout(true); // Show About section when About button is clicked
  };

  const handleGoBack = () => {
    setShowAbout(false); // Hide About section when Go Back button is clicked
  };

  const [isElementSelected, setIsElementSelected] = useState(false);

  const handleFormSubmit = ({
    position,
    title,
    content,
    theme,
    showAuthor,
  }) => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "add-annotation",
          position,
          title,
          content,
          theme,
          showAuthor,
        },
      },
      "*"
    );
    console.log("Form submitted:", {
      position,
      title,
      content,
      theme,
      showAuthor,
    });
  };

  const [authorName, setAuthorName] = useState("");

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      console.log(event.data.pluginMessage);
      const { type, userName } = event.data.pluginMessage;
      if (type === "no-element-selected") {
        setIsElementSelected(false);
      }

      if (type === "element-selected") {
        setIsElementSelected(true);
        setAuthorName(userName);
      }
    };
  }, []);

  return (
    <>
      {showAbout ? (
        <About onGoBack={handleGoBack} />
      ) : (
        <>
          {isElementSelected ? (
            <Form onSubmit={handleFormSubmit} authorName={authorName} />
          ) : (
            <EmptyState />
          )}
          <Footer onAboutClick={handleAboutClick} />
        </>
      )}
    </>
  );
}

export default App;
