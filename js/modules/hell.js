const cardsArray = [
  "./assets/1.jpg",
  "./assets/1.jpg",
  "./assets/2.jpg",
  "./assets/2.jpg",
  "./assets/3.jpg",
  "./assets/3.jpg",
  "./assets/4.jpg",
  "./assets/4.jpg",
  "./assets/5.jpg",
  "./assets/5.jpg",
  "./assets/6.jpg",
  "./assets/6.jpg",
  "./assets/7.jpg",
  "./assets/7.jpg",
  "./assets/8.jpg",
  "./assets/8.jpg",
];
let flippedCard = [];
let flippedId = [];
let clickcount = 0;
let bestScore = 99;
let bestChrono = "10:00:000";
let innerCards = document.querySelectorAll(".inner");
let backs = document.querySelectorAll(".back");
let clickDisplay = document.getElementById("clickcount");
let close = document.getElementsByClassName("close")[0];
let resultDisplay = document.getElementById("resultats");
let resultText = document.querySelector(".modal-content p");
let bestChronoDisplay = document.getElementById("bestchrono");
let bestScoreDisplay = document.getElementById("best");

import { newGame } from "./reinitialize.js";

window.onload = start();
document.getElementById("rejouer").addEventListener("click", newGame);
document.getElementById("playagain").addEventListener("click", newGame);

import { shuffle } from "./shuffleCard.js";
import { assignCards } from "./assign.js";

export function start() {
  shuffle(cardsArray);
  assignCards();
  innerCards.forEach((card) => card.addEventListener("click", flippedCards));
}
