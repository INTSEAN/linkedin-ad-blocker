/* 
  This event triggers righ when a browsers has committed to loading a webpage, 
  this needs to happen early so that we can start removing the ads as soon as possible
*/

chrome.webNavigation.onCommitted.addListener(function (tab) {
  // We need to ensure the script runs only on the main frame. 
  // We restrict from running within embedded frames.
  if (frame == 0) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        // We get the page url
        let url = tabs[0].url;

        // We remove unnecessary protocl definitions and the wwww subdomain
        let parsedURL = url.replace("https://", "")
        .replace("wwww", "")
        .replace("http://", "");

        // We remove any paths or queries
        let domain = parsedURL.slice(0, parsedURL.lastIndexOf('/') == -1 ? parsedURL.length : parsedURL.lastIndexOf('/'))
        .slice(0, parsedURL.indexOf('?') == -1 ? parsedURL.length : parsedURL.indexOf('?'));

        try {
          if (domain.length < 1 || domain === null || domain === undefined) {
            return;
          } else if (domain == "linkedin.com") {
            // We remove the ads on linkedin
            runLinkedinScript();
            return;
          }
        } catch (err) {
          throw new Error("Error removing ads: " + err);
        }

      }
    )
  }
});

// This function removes ads on Linkedin
function runLinkedinScript() {
  // inject the script form file into the webpage
  chrome.tabs.executeScript({file: "linkedin.js"});
  return true;
}
