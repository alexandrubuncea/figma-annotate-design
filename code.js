"use strict";
// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
    width: 360,
    height: 612,
    title: "Annotate Design",
    themeColors: true,
});
// Check if something is selected on the artboard
figma.on("selectionchange", () => {
    // This is the event listener
    if (figma.currentPage.selection.length === 0) {
        figma.ui.postMessage({
            type: "no-element-selected",
        });
    }
    else {
        figma.ui.postMessage({
            type: "element-selected",
        });
    }
});
// Load the fonts async function
const loadingFontFunction = () => __awaiter(void 0, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: "Inter", style: "Regular" });
    yield figma.loadFontAsync({ family: "Inter", style: "Medium" });
    yield figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
});
// HEX to RGB function -- This one returns the RGB color as Figma uses it, with values between 0 and 1
function hexToRGB(hex) {
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
// Some variables for colors
const backgroundColor = hexToRGB("#131314");
const textColor = hexToRGB("#FFFFFF");
const borderColor = hexToRGB("#44474A");
// Create the annotation function
function createAnnotation(annotationPosition, annotationTitle, annotationContent) {
    let currentSelection = figma.currentPage.selection[0];
    let currentBounds = currentSelection.absoluteBoundingBox;
    let textFrameWidth;
    let textFrameHeight;
    // Dot
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
    // Line
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
        }
        else if (annotationPosition === "top" ||
            annotationPosition === "bottom") {
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
        annotationTextFrame.itemSpacing = 0;
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
        annotationTextFrame.paddingTop = 8;
        annotationTextFrame.paddingBottom = 8;
        annotationFrame.appendChild(annotationTextFrame);
        // Content
        const createText = (nameText, contentText, font) => {
            const text = figma.createText();
            text.name = nameText;
            text.characters = contentText.toString();
            text.fontName = font;
            text.fontSize = 14;
            text.fills = [{ type: "SOLID", color: textColor }];
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
        if (titleWidth > 360 || content.width > 360) {
            annotationTextFrame.resize(360, annotationTextFrame.height);
            annotationTextFrame.primaryAxisSizingMode = "AUTO";
            annotationTextFrame.counterAxisSizingMode = "FIXED";
            content.layoutAlign = "STRETCH";
            if (titleLayer) {
                titleLayer.layoutAlign = "STRETCH";
            }
        }
        else {
            annotationTextFrame.primaryAxisSizingMode = "AUTO";
            annotationTextFrame.counterAxisSizingMode = "AUTO";
        }
        textFrameWidth = annotationTextFrame.width;
        textFrameHeight = annotationTextFrame.height;
    }
    // Annotation Frame
    const annotationFrame = figma.createFrame();
    annotationFrame.name = `${currentSelection.name} Annotation`;
    annotationFrame.fills = [];
    annotationFrame.primaryAxisSizingMode = "FIXED";
    annotationFrame.counterAxisSizingMode = "AUTO";
    annotationFrame.primaryAxisAlignItems = "CENTER";
    annotationFrame.counterAxisAlignItems = "CENTER";
    annotationFrame.itemSpacing = -2;
    const existingFrame = figma.currentPage.findChild((layer) => layer.name === "🗒️ Annotations" && layer.type === "FRAME");
    if (!existingFrame) {
        const parentFrame = figma.createFrame();
        parentFrame.name = "🗒️ Annotations";
        parentFrame.locked = true;
        parentFrame.fills = [];
        parentFrame.clipsContent = false;
        figma.currentPage.appendChild(parentFrame);
        parentFrame.appendChild(annotationFrame);
    }
    else if (existingFrame && existingFrame.type === "FRAME") {
        existingFrame.appendChild(annotationFrame);
    }
    // Frame top
    function frameTop() {
        textFrame();
        line();
        dot();
        annotationFrame.layoutMode = "VERTICAL";
        annotationFrame.layoutAlign = "STRETCH";
        annotationFrame.itemReverseZIndex = true;
        if (currentBounds !== null) {
            annotationFrame.resize(textFrameWidth, textFrameHeight + 80);
            annotationFrame.x = Math.round(currentBounds.x + currentSelection.width / 2 - textFrameWidth / 2);
            annotationFrame.y = Math.round(currentBounds.y - annotationFrame.height + 4);
        }
    }
    // Frame bottom
    function frameBottom() {
        dot();
        line();
        textFrame();
        annotationFrame.layoutMode = "VERTICAL";
        annotationFrame.layoutAlign = "STRETCH";
        if (currentBounds !== null) {
            annotationFrame.resize(textFrameWidth, textFrameHeight + 80);
            annotationFrame.x = Math.round(currentBounds.x + currentSelection.width / 2 - textFrameWidth / 2);
            annotationFrame.y = Math.round(currentBounds.y + currentSelection.height - 4);
        }
    }
    // Frame left
    function frameLeft() {
        textFrame();
        line();
        dot();
        annotationFrame.layoutMode = "HORIZONTAL";
        annotationFrame.layoutAlign = "STRETCH";
        if (currentBounds !== null) {
            annotationFrame.resize(textFrameWidth + 80, textFrameHeight);
            annotationFrame.x = Math.round(currentBounds.x - annotationFrame.width + 4);
            annotationFrame.y = Math.round(currentBounds.y + currentSelection.height / 2 - textFrameHeight / 2);
        }
        annotationFrame.itemReverseZIndex = true;
    }
    // Frame right
    function frameRight() {
        dot();
        line();
        textFrame();
        annotationFrame.layoutMode = "HORIZONTAL";
        annotationFrame.layoutAlign = "STRETCH";
        if (currentBounds !== null) {
            annotationFrame.resize(textFrameWidth + 80, textFrameHeight);
            annotationFrame.x = Math.round(currentBounds.x + currentSelection.width - 4);
            annotationFrame.y = Math.round(currentBounds.y + currentSelection.height / 2 - textFrameHeight / 2);
        }
    }
    if (annotationPosition === "top") {
        frameTop();
    }
    else if (annotationPosition === "bottom") {
        frameBottom();
    }
    else if (annotationPosition === "left") {
        frameLeft();
    }
    else if (annotationPosition === "right") {
        frameRight();
    }
    else {
        figma.notify("Please select a position for the annotation.");
    }
}
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === "add-annotation") {
        loadingFontFunction()
            .then(() => {
            createAnnotation(msg.position, msg.title, msg.content);
            figma.notify("Annotation added.");
        })
            .catch(() => {
            figma.notify("Something went wrong. 😔");
        });
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    // figma.closePlugin();
};
