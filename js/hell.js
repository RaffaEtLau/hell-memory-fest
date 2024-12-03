const memoryContainer = document.querySelector(".memoryContainer");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let nbrCoups = 0;

document.querySelector(".nbrCoups").textContent = nbrCoups;

fetch("./data/cards.json")
.then((res) => res.json())
.then((data) => {
  cards = [...data, ...data];
  shuffleCards();
  generateCards();
})

