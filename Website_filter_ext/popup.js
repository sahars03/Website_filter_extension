// popup.js

/* I probably need to change manifest (and other files) to get rid of the 'pdf requirement' seeing as this works everywhere */ 
document.addEventListener('DOMContentLoaded', function () {
    const colorPicker = document.getElementById('colorPicker');

    colorPicker.addEventListener('input', function(event) {
        const color = event.target.value;

        // Send the color to content script
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: applyOverlay,
                args: [color]
            });
        });
    });
});

// Function to be executed in the context of the web page
function applyOverlay(color) {
    // Remove existing overlays
    const existingCovers = document.querySelectorAll('.pdf-overlay');
    existingCovers.forEach(cover => cover.remove());

    // If color is set to 'none', do not create a new overlay
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
    z-index: 9999; /* Make sure the overlay is on top */
    `;
    cover.setAttribute("style", css);
    document.body.appendChild(cover);
}
