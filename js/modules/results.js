import { flippedCards } from "./flipCard.js";
// import { chronoStop } from "./chrono.js";

// export function results() {
//   chronoStop();
//   innerCards.forEach((card) => card.removeEventListener("click", flippedCards));
//   resultDisplay.style.display = "block";
//   resultText.innerHTML =
//     "<h1>Bravo</h1>" +
//     "Vous avez trouvé toutes les paires en " +
//     clickcount +
//     "coups <br>" +
//     "Le tout en " +
//     chronotime.value +
//     " secondes";
//   if (clickcount < bestScore) {
//     bestScore = clickcount;
//     bestScoreDisplay.innerHTML = bestScore;
//   }
//   if (chronotime.value < bestChrono) {
//     bestChrono = chronotime.value;
//     bestChronoDisplay.innerHTML = bestChrono;
//   }
//   close.onclick = function () {
//     resultDisplay.style.display = "none";
//   };
//   window.onclick = function event() {
//     if (event.target == resultDisplay) {
//       resultDisplay.style.display = "none";
//     }
//   };
// }
