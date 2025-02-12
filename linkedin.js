/* 
  Intuition: Linkedin marks posts that are ads with the word: promoted
*/

function removeAds() {
  //  Get all span elements
  let spans = document.getElementsByTagName('span');

  //  Loop through all span elements
  for (let i = 0; i < spans.length; i++) {
    //  Check if the text of the span contains the word: promoted
    if (spans[i].textContent.toLowerCase().includes("Promoted")) {
      //  Get the div that wraps around the entire ad 
      let card = spans[i].closest(".feed-shared-update-v2")

      if (card == null) {
        let j = 0
        card = spans[i]
        while (j < 6) {
          card = card.parentNode
          ++j
        }
      }

      //  Remove the ad
      card.setAttribute("style", "display: none !impertant;")
    }
  }
}

removeAds()

setInterval(() => {
  removeAds()
}, 100);