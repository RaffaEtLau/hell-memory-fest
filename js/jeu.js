const gameState = {
  cards: [],
  selectedCards: [],
  score: 0,
  matchedPairs: 0,
  totalPairs: 0,
  cardImages: {},
};

const scoreBoard = document.getElementById("scoreBoard");

async function loadCardConfig() {
  try {
    const response = await fetch("./data/cards.json");
    const data = await response.json();
    // this.cardSet = data.cardSets.find(set => set.id === this.selectedCardSet)
    return data.cardSets[0];
    // if(!this.cardSet) {
    // throw new Error(`Jeu de cartes du groupe ${this.selectedCardSet} introuvable`)
    // }
  } catch (error) {
    console.error("Erreur de chargement du jeu de cartes", error);
    return null;
  }
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCards(cardSet) {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  // const selectedCards = this.cardSet.slice(0, 8)
  const { values, images } = cardSet;
  gameState.cardImages = images;

  const doubleValues = shuffleArray([...values, ...values]);

  gameState.totalPairs = values.length;
  gameState.cards = [];
  gameState.selectedCards = [];
  gameState.score = 0;
  gameState.matchedPairs = 0;

  doubleValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-value", value);
    card.setAttribute("data-matched", "false");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.style.backgroundImage = `url('./img/facearriere.png')`;
    cardFront.style.backgroundSize = "cover";

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.style.backgroundImage = `url(${images[value]})`;
    cardBack.style.backgroundSize = "cover";

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
    gameState.cards.push(card);
  });
}

function flipCard(event) {
  const card = event.target.closest(".card");

  console.log(card);

  if (
    card.getAttribute("data-matched") === "true" ||
    card.classList.contains("flipped") ||
    gameState.selectedCards.length >= 2
  )
    return;

  card.classList.add("flipped");
  gameState.selectedCards.push(card);

  if (gameState.selectedCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const [card1, card2] = gameState.selectedCards;
  const isMatch = card1.dataset.value === card2.dataset.value;
  if (isMatch) {
    card1.setAttribute("data-matched", "true");
    card2.setAttribute("data-matched", "true");
    card1.classList.add("matched");
    card2.classList.add("matched");
    gameState.matchedPairs++;

    if (gameState.matchedPairs === gameState.totalPairs) {
      setTimeout(() => alert("Bravo !!! Vous avec gagné !"), 500);
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }
  gameState.score++;
  scoreBoard.textContent = `Nombre de coups : ${gameState.score}`;
  gameState.selectedCards = [];
}

async function initializeGame() {
  const cardSet = await loadCardConfig();
  if (cardSet) {
    createCards(cardSet);
  }
}

document.addEventListener("DOMContentLoaded", initializeGame);
