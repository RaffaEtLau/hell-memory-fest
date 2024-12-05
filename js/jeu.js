const gameState = {
  cards: [],
  selectedCards: [],
  score: 0,
  matchedPairs: 0,
  totalPairs: 0,
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
    card.style.backgroundImage = `url(${images[value]})`;
    card.style.backgroundSize = "cover";
    card.style.backgroundColor = "grey";

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
    gameState.cards.push(card);
  });
}

function flipCard(event) {
  const card = event.target;
  if (
    card.getAttribute("data-matched") === "true" ||
    gameState.selectedCards.includes(card) ||
    gameState.selectedCards.length >= 2
  )
    return;

  card.style.backgroundColor = "transparent";
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
    card1.style.opacity = "0.5";
    card2.style.opacity = "0.5";
    gameState.matchedPairs++;
    
    if (gameState.matchedPairs === gameState.totalPairs) {
      setTimeout(() => alert("Bravo !!! Vous avec gagné !"), 500);
    }
  } else {
    card1.style.backgroundColor = "grey";
    card2.style.backgroundColor = "grey";
  }
  gameState.score++;
  scoreBoard.textContent = `Score : ${gameState.score}`;

  gameState.selectedCards = [];
}

async function initializeGame() {
  const cardSet = await loadCardConfig();
  if (cardSet) {
    createCards(cardSet);
  }
}

document.addEventListener("DOMContentLoaded", initializeGame);
