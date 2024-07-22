/* content.js */

/**
 * Applies a filter, selected by the user, on the page.
 * 
 * @param {string} color  the filter to be added 
 * @returns {void}
 */
function applyFilter(color) {
    // removes existing filters
    const currentFilters = document.querySelectorAll('.website_filter');
    currentFilters.forEach(filter => filter.remove());

    // no filter should be added if 'none' is selected
    if (color === 'none' || color === 'transparent') {
        return;
    }

    const filter = document.createElement("div");
    filter.className = 'website_filter';
    // css style (filter) that will be applied to the new element
    let css = `
        position: fixed;
        pointer-events: none;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: ${color};
        mix-blend-mode: difference;
        z-index: 9999;
    `;
    filter.setAttribute("style", css);
    // adds the styled element to the body of the page
    document.body.appendChild(filter);
}
