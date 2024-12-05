// const cardsArray = [
//   "./assets/1.jpg",
//   "./assets/1.jpg",
//   "./assets/2.jpg",
//   "./assets/2.jpg",
//   "./assets/3.jpg",
//   "./assets/3.jpg",
//   "./assets/4.jpg",
//   "./assets/4.jpg",
//   "./assets/5.jpg",
//   "./assets/5.jpg",
//   "./assets/6.jpg",
//   "./assets/6.jpg",
//   "./assets/7.jpg",
//   "./assets/7.jpg",
//   "./assets/8.jpg",
//   "./assets/8.jpg",
// ];
// let flippedCard = [];
// let flippedId = [];
// let clickCount = 0;
// let bestScore = 99;
// let bestChrono = "10:00:000";
// let innerCards,
//   backs,
//   clickDisplay,
//   close,
//   resultDisplay,
//   resultText,
//   bestChronoDisplay,
//   bestScoreDisplay;

// function initializeDOM() {
//   innerCards = document.querySelectorAll(".inner");
//   backs = document.querySelectorAll(".back");
//   clickDisplay = document.getElementById("clickcount");
//   close = document.getElementsByClassName("close")[0];
//   resultDisplay = document.getElementById("resultats");
//   resultText = document.querySelector(".modal-content p");
//   bestChronoDisplay = document.getElementById("bestchrono");
//   bestScoreDisplay = document.getElementById("best");

//   document.getElementById("rejouer").addEventListener("click", newGame);
//   document.getElementById("playagain").addEventListener("click", newGame);
// }
// function assignCards() {
//   for (let i = 0; i < cardsArray.length; i++) {
//     backs[i].innerHTML = cardsArray[i];
//   }
//   backs.forEach((back) => back.classList.remove("foundCard"));
// }
// function start() {
//   initializeDOM();
//   // shuffle(cardsArray);
//   assignCards();
//   innerCards.forEach((card) => card.addEventListener("click", flippedCards));
// }

// window.onload = start;

// import { newGame } from "./reinitialize.js";
// // import { shuffle } from "./shuffleCard.js";
// // import { assignCards } from "./assign.js";
