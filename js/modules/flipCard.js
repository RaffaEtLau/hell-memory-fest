import { chronoStart } from "./chrono.js";

export function flippedCards() {
  if (isStarted === false) {
    chronoStart();
    isStarted = true;
  }
  this.classList.add("flipped");
  flippedCard.push(this.children[1].innertHTML);
  flippedId.push(this.getAttribut("value"));
  if (flippedId[0] === flippedId[1]) {
    flippedId.splice(1);
    flippedCard.splice(1);
  }
  if (flippedId.lenght === 2) {
    clickcount++;
    innerCards.forEach((card) =>
      card.removeEventListener("click", flippedCards)
    );
    setTimeout(checkCards, 400);
  }
  clickDisplay.innerHTML = clickcount;
}
