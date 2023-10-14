figma.showUI(__html__, {
  width: 360,
  height: 760, // 760
  title: "Annotate Design",
  themeColors: true,
});

// Get the current user
const user = figma.currentUser;

// Get the user's name
const userName = user.name;

// Relaunch
figma.root.setRelaunchData({ open: "" });

// Check if something is selected on the artboard

// This function checks if something is selected on the artboard
function checkSelection() {
  if (figma.currentPage.selection.length === 0) {
    figma.ui.postMessage({
      type: "no-element-selected",
    });
  } else {
    figma.ui.postMessage({
      type: "element-selected",
      userName,
    });
  }
}

// Run the checkSelection function
checkSelection();

// Listen for selection changes
figma.on("selectionchange", () => {
  checkSelection();
});

// Load the fonts async function
const loadingFontFunction = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Medium" });
  await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
};

// HEX to RGB function -- This one returns the RGB color as Figma uses it, with values between 0 and 1
function hexToRGB(hex: string) {
  // Remove the leading "#" from the hex string
  hex = hex.slice(1);
  // Convert the hex string to a number
  const value = parseInt(hex, 16);
  // Extract the red, green, and blue values from the number
  const r = ((value >> 16) & 255) / 255;
  const g = ((value >> 8) & 255) / 255;
  const b = (value & 255) / 255;
  // Return the RGB values as an object
  return { r, g, b };
}

// Create annotation function
function createAnnotation(
  annotationPosition: string,
  annotationTitle: string,
  annotationContent: string,
  annotationTheme: string,
  showAuthor: boolean
) {
  let currentSelection = figma.currentPage.selection[0];
  let currentBounds = currentSelection.absoluteBoundingBox;
  let textFrameWidth: number;
  let textFrameHeight: number;

  // Annotation theme
  let backgroundColor, borderColor, textColor, authorColor;
  if (annotationTheme === "dark") {
    backgroundColor = hexToRGB("#131314");
    borderColor = hexToRGB("#44474A");
    textColor = hexToRGB("#FFFFFF");
    authorColor = hexToRGB("#F0F2F5");
  } else if (annotationTheme === "light") {
    backgroundColor = hexToRGB("#FFFFFF");
    borderColor = hexToRGB("#F0F2F5");
    textColor = hexToRGB("#131314");
    authorColor = hexToRGB("#44474A");
  } else if (annotationTheme === "red") {
    backgroundColor = hexToRGB("#F0BCBC");
    borderColor = hexToRGB("#EDABAB");
    textColor = hexToRGB("#131314");
    authorColor = hexToRGB("#44474A");
  } else if (annotationTheme === "yellow") {
    backgroundColor = hexToRGB("#F0DEBC");
    borderColor = hexToRGB("#EDD6AB");
    textColor = hexToRGB("#131314");
    authorColor = hexToRGB("#44474A");
  } else if (annotationTheme === "green") {
    backgroundColor = hexToRGB("#BCF0D8");
    borderColor = hexToRGB("#ABEDCE");
    textColor = hexToRGB("#131314");
    authorColor = hexToRGB("#44474A");
  } else if (annotationTheme === "purple") {
    backgroundColor = hexToRGB("#BCC5F0");
    borderColor = hexToRGB("#ABB6ED");
    textColor = hexToRGB("#131314");
    authorColor = hexToRGB("#44474A");
  }

  // Annotation dot
  function dot() {
    const annotationDot = figma.createEllipse();
    annotationDot.name = "Dot";
    annotationDot.resize(8, 8);
    annotationDot.fills = [
      {
        type: "SOLID",
        color: backgroundColor,
      },
    ];
    annotationFrame.appendChild(annotationDot);
  }

  // Annotation line
  function line() {
    const annotationLine = figma.createRectangle();
    annotationLine.name = "Line";
    annotationLine.layoutGrow = 1;
    annotationLine.fills = [
      {
        type: "SOLID",
        color: backgroundColor,
      },
    ];

    if (annotationPosition === "right" || annotationPosition === "left") {
      annotationLine.resize(100, 2);
    } else if (
      annotationPosition === "top" ||
      annotationPosition === "bottom"
    ) {
      annotationLine.resize(2, 100);
    }

    annotationFrame.appendChild(annotationLine);
  }

  // Text frame
  function textFrame() {
    const annotationTextFrame = figma.createFrame();
    annotationTextFrame.name = "Content";
    annotationTextFrame.layoutMode = "VERTICAL";
    annotationTextFrame.layoutAlign = "STRETCH";
    annotationTextFrame.itemSpacing = 4;

    annotationTextFrame.fills = [
      {
        type: "SOLID",
        color: backgroundColor,
      },
    ];
    annotationTextFrame.strokes = [
      {
        type: "SOLID",
        color: borderColor,
      },
    ];
    annotationTextFrame.effects = [
      {
        type: "DROP_SHADOW",
        color: {
          r: 0.07450980693101883,
          g: 0.07450980693101883,
          b: 0.0784313753247261,
          a: 0.12,
        },
        offset: { x: 0, y: 3 },
        radius: 8,
        visible: true,
        blendMode: "NORMAL",
      },
    ];
    annotationTextFrame.cornerRadius = 8;
    annotationTextFrame.paddingLeft = 16;
    annotationTextFrame.paddingRight = 16;
    annotationTextFrame.paddingTop = 16;
    annotationTextFrame.paddingBottom = 16;

    annotationFrame.appendChild(annotationTextFrame);

    // Text frame content
    const createText = (nameText: string, contentText: string, font: any) => {
      const text = figma.createText();
      text.name = nameText;
      text.characters = contentText.toString();
      text.fontName = font;
      text.fontSize = 14;
      text.lineHeight = { value: 20, unit: "PIXELS" };
      text.fills = [{ type: "SOLID", color: textColor }];
      return text;
    };

    const createAuthor = (nameText: string, contentText: string, font: any) => {
      const text = figma.createText();
      text.name = nameText;
      text.characters = contentText.toString();
      text.fontName = font;
      text.fontSize = 12;
      text.lineHeight = { value: 16, unit: "PIXELS" };
      text.fills = [{ type: "SOLID", color: authorColor }];
      return text;
    };

    const content = createText("Content", annotationContent, {
      family: "Inter",
      style: "Regular",
    });

    let titleWidth = 0;
    let titleLayer;
    if (annotationTitle !== "") {
      const title = createText("Title", annotationTitle, {
        family: "Inter",
        style: "Semi Bold",
      });
      annotationTextFrame.appendChild(title);
      titleWidth = title.width;
      titleLayer = title;
    }

    annotationTextFrame.appendChild(content);

    if (showAuthor) {
      const authorFrame = figma.createFrame(); // Create a new frame for the author text
      authorFrame.name = "Author"; // Set a name for the frame
      authorFrame.layoutMode = "VERTICAL";
      authorFrame.layoutAlign = "STRETCH";
      authorFrame.itemSpacing = 0;
      authorFrame.paddingTop = 8; // Set top padding
      authorFrame.paddingBottom = 0; // Set bottom padding
      authorFrame.fills = []; // No background color

      const author = createAuthor("Author", `🖋️ ${userName}`, {
        family: "Inter",
        style: "Regular",
      });

      authorFrame.appendChild(author);
      annotationTextFrame.appendChild(authorFrame);
    }

    if (titleWidth > 360 || content.width > 360) {
      annotationTextFrame.resize(360, annotationTextFrame.height);
      annotationTextFrame.primaryAxisSizingMode = "AUTO";
      annotationTextFrame.counterAxisSizingMode = "FIXED";
      content.layoutAlign = "STRETCH";
      if (titleLayer) {
        titleLayer.layoutAlign = "STRETCH";
      }
    } else {
      annotationTextFrame.primaryAxisSizingMode = "AUTO";
      annotationTextFrame.counterAxisSizingMode = "AUTO";
    }
    textFrameWidth = annotationTextFrame.width;
    textFrameHeight = annotationTextFrame.height;
  }

  // Annotation Frame
  const annotationFrame = figma.createFrame();
  annotationFrame.name = `Annotation`;
  annotationFrame.fills = [];
  annotationFrame.primaryAxisSizingMode = "FIXED";
  annotationFrame.counterAxisSizingMode = "AUTO";
  annotationFrame.primaryAxisAlignItems = "CENTER";
  annotationFrame.counterAxisAlignItems = "CENTER";
  annotationFrame.itemSpacing = -2;
  annotationFrame.clipsContent = false;

  // Function to set the annotation frame properties
  function setAnnotationFrameProperties(annotationPosition: string) {
    if (annotationPosition === "right" || annotationPosition === "left") {
      annotationFrame.layoutMode = "HORIZONTAL";
      annotationFrame.layoutAlign = "STRETCH";
    } else if (
      annotationPosition === "top" ||
      annotationPosition === "bottom"
    ) {
      annotationFrame.layoutMode = "VERTICAL";
      annotationFrame.layoutAlign = "STRETCH";
    }
  }

  // Function to set the annotation frame properties based on the position
  function positionAnnotationFrame(annotationPosition: string) {
    if (currentBounds !== null) {
      switch (annotationPosition) {
        case "top":
          annotationFrame.resize(textFrameWidth, textFrameHeight + 80);
          annotationFrame.x = Math.round(
            currentBounds.x + currentSelection.width / 2 - textFrameWidth / 2
          );
          annotationFrame.y = Math.round(
            currentBounds.y - annotationFrame.height + 4
          );
          break;
        case "bottom":
          annotationFrame.resize(textFrameWidth, textFrameHeight + 80);
          annotationFrame.x = Math.round(
            currentBounds.x + currentSelection.width / 2 - textFrameWidth / 2
          );
          annotationFrame.y = Math.round(
            currentBounds.y + currentSelection.height - 4
          );
          break;
        case "left":
          annotationFrame.resize(textFrameWidth + 80, textFrameHeight);
          annotationFrame.x = Math.round(
            currentBounds.x - annotationFrame.width + 4
          );
          annotationFrame.y = Math.round(
            currentBounds.y + currentSelection.height / 2 - textFrameHeight / 2
          );
          break;
        case "right":
          annotationFrame.resize(textFrameWidth + 80, textFrameHeight);
          annotationFrame.x = Math.round(
            currentBounds.x + currentSelection.width - 4
          );
          annotationFrame.y = Math.round(
            currentBounds.y + currentSelection.height / 2 - textFrameHeight / 2
          );
          break;
      }
    }

    // Add it to a group
    const currentPage = figma.currentPage;
    const group = figma.group([annotationFrame], currentPage);
    group.name = `📝 Annotation · ${currentSelection.name}`;
    // Insert the group at the beginning of the page's children array
    currentPage.appendChild(group);
  }

  // Calling the function to position the annotation based on the selected position
  if (annotationPosition === "top") {
    textFrame();
    line();
    dot();
    setAnnotationFrameProperties(annotationPosition);
    positionAnnotationFrame(annotationPosition);
    annotationFrame.itemReverseZIndex = true;
  } else if (annotationPosition === "bottom") {
    dot();
    line();
    textFrame();
    setAnnotationFrameProperties(annotationPosition);
    positionAnnotationFrame(annotationPosition);
  } else if (annotationPosition === "left") {
    textFrame();
    line();
    dot();
    setAnnotationFrameProperties(annotationPosition);
    positionAnnotationFrame(annotationPosition);
    annotationFrame.itemReverseZIndex = true;
  } else if (annotationPosition === "right") {
    dot();
    line();
    textFrame();
    setAnnotationFrameProperties(annotationPosition);
    positionAnnotationFrame(annotationPosition);
  } else {
    figma.notify("Please select a position for the annotation.");
  }
}

// Getting the information from the UI and calling the function to create the annotation
figma.ui.onmessage = (msg) => {
  if (msg.type === "add-annotation") {
    loadingFontFunction()
      .then(() => {
        createAnnotation(
          msg.position,
          msg.title,
          msg.content,
          msg.theme,
          msg.showAuthor
        );
        figma.notify("Annotation added.");
      })
      .catch(() => {
        figma.notify("Something went wrong. 😔");
      });
  }
};
