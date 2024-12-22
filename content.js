function useDefaultMonospace() {
  // Function to check if a font-family includes monospace
  const hasMonospace = (fontFamily) => {
    return fontFamily.toLowerCase().includes("monospace");
  };

  // Function to get only monospace and following fallbacks
  const getMonospaceAndFallbacks = (fontFamily) => {
    const fonts = fontFamily.split(",").map((f) => f.trim());
    const monoIndex = fonts.findIndex(
      (f) =>
        f.toLowerCase() === "monospace" ||
        f.toLowerCase() === '"monospace"' ||
        f.toLowerCase() === "'monospace'"
    );

    if (monoIndex !== -1) {
      return fonts.slice(monoIndex).join(", ");
    }
    return fontFamily;
  };

  // Get all elements
  const allElements = document.getElementsByTagName("*");

  // Iterate through all elements
  for (let element of allElements) {
    const style = window.getComputedStyle(element);
    const fontFamily = style.getPropertyValue("font-family");

    // If the element uses a monospace font
    if (hasMonospace(fontFamily)) {
      // Keep only monospace and following fallbacks
      element.style.setProperty(
        "font-family",
        getMonospaceAndFallbacks(fontFamily),
        "important"
      );
    }
  }
}

// Run immediately
useDefaultMonospace();

// Create a MutationObserver to handle dynamically added content
const observer = new MutationObserver((mutations) => {
  useDefaultMonospace();
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["style", "class"],
});
