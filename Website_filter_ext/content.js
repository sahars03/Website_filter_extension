// content.js
// Function to check if the current page is displaying a PDF
function isPDF() {
    return document.contentType === 'application/pdf' || document.querySelector('embed[type="application/pdf"]') !== null;
}

// Function to apply the overlay with specified color
function applyOverlay(color) {
    if (!isPDF()) return; // Only apply if it's a PDF

    // Remove existing overlays
    const existingCovers = document.querySelectorAll('.pdf-overlay');
    existingCovers.forEach(cover => cover.remove());

    // Skip creating a new overlay if color is 'none' or 'transparent'
    if (color === 'none' || color === 'transparent') {
        return;
    }

    // Create and style the new overlay
    const cover = document.createElement("div");
    cover.className = 'pdf-overlay'; // Assign a class for easier removal
    let css = `
    position: fixed;
    pointer-events: none;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${color};
    mix-blend-mode: difference;
    z-index: 9999; /* Ensure the overlay is on top */
    `;
    cover.setAttribute("style", css);
    document.body.appendChild(cover);
}

// Function to reset the overlay
function resetOverlay() {
    const covers = document.querySelectorAll('.pdf-overlay');
    covers.forEach(cover => cover.remove());
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'changeColor') {
        applyOverlay(message.color);
    } else if (message.action === 'resetOverlay') {
        resetOverlay();
    }
});


// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'changeColor') {
        applyOverlay(message.color);
    } else if (message.action === 'resetOverlay') {
        resetOverlay();
    }
});
