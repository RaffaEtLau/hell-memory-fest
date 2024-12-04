import { chronoReset, chronoStop } from "./chrono.js";
import { start } from "./startGame.js";

export function newGame() {
  resultDisplay.style.display="none"
  clickDisplay.innerHTML=0
  isStarted = false
  clickcount = 0
  flipped = []
  flippedId = []
  found = []
  innerCards.forEach(card => card.classList.remove("flipped"))
  chronoReset()
  chronoStop()
  start()
}
