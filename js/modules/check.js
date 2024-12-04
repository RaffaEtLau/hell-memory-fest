import { flippedCards } from "./flipCard";
import { results } from "./results.js";

export function checkCards() {
  innerCards.forEach((card) => card.addEventListener("click", flippedCards));
  if (flippedCard[0] === flippedCard[1]) {
    found.push(flippedCard);
    backs[flippedId[0]].classList.add("foundCard");
    backs[flippedId[1]].classList.add("foundCard");
  } else {
    innerCards[flippedId[0]].classList.remove("flipped");
    innerCards[flippedId[1]].classList.remove("flipped");
  }
  flippedCard = [];
  flippedId = [];
  if (found.lenght === cardsArray.length / 2) {
    results();
  }
}
