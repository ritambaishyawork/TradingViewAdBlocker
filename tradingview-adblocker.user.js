// ==UserScript==
// @name         TradingView Toast Group Hide
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hides the toast group notifications on TradingView
// @author       Ritam Baishya
// @match        https://*.tradingview.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to create and add CSS to the page
    function addStyle(css) {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    // Function to hide toast group
    function hideToastGroup() {
        // Add CSS to hide the toast group
        const css = `
            .toastGroup-JUpQSPBo {
                display: none !important;
            }
        `;
        addStyle(css);
    }

    // Function to initialize the script
    function init() {
        // Hide toast group immediately
        hideToastGroup();

        // Create an observer to handle dynamically loaded content
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length) {
                    const toastGroup = document.querySelector('.toastGroup-JUpQSPBo');
                    if (toastGroup) {
                        hideToastGroup();
                    }
                }
            }
        });

        // Start observing the document body for added nodes
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Run the initialization when the page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
