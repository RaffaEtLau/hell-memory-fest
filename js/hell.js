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

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    memoryContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped")

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  nbrCoups ++;
  document.querySelector(".nbrCoups").textContent = nbrCoups;
  lockBoard = true
  
  checkForMatch()
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name

  isMatch ? disableCards() : unflipCards()
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard)
  secondCard.removeEventListener("click", flipCard)

  resetBoard()
}

function unflipCards() {
  setTimeout (() => {
    firstCard.classList.remove("flipped")
    secondCard.classList.remove("flipped")
    resetBoard()
  }, 1000)
}

function resetBoard() {
  firstCard = null
  secondCard = null
  lockBoard = false
}

function restart() {
  resetBoard()
  shuffleCards()
  nbrCoups = 0
  document.querySelector(".nbrCoups").textContent = nbrCoups
  memoryContainer.innerHTML = ""
  generateCards()
}

