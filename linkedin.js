(function() {
  // Function to test whether an element is an ad indicator.
  function isAdElement(el) {
    if (el.hasAttribute("aria-label") && el.getAttribute("aria-label") === "Sponsored")
      return true;
    if (el.hasAttribute("data-test-ad"))
      return true;
    if (el.classList && el.classList.contains("feed-ad"))
      return true;
    if (el.tagName === "SPAN" && el.textContent.trim() === "Promoted")
      return true;
    return false;
  }

  // Function that uses a TreeWalker to traverse the document (or a subtree)
  // and hides any node that qualifies as an ad (or its container).
  function processAds(root) {
    // Create a TreeWalker that shows all element nodes.
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
      acceptNode: function(node) {
        return isAdElement(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    
    let currentNode;
    while ((currentNode = walker.nextNode())) {
      // Attempt to find a common ad container (if available)
      const container = currentNode.closest(".feed-shared-update-v2") || currentNode;
      container.style.display = "none";
      console.log("Removed ad element:", container);
    }
  }

  // Initial removal: process the entire document body.
  processAds(document.body);

  // Set up a MutationObserver to process any new nodes that are added dynamically.
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(addedNode => {
        // Only process element nodes.
        if (addedNode.nodeType === Node.ELEMENT_NODE) {
          processAds(addedNode);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
