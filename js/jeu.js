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

function getMemorySize() {
  const currentUserEmail = localStorage.getItem("currentUserEmail");
  const users = JSON.parse(localStorage.getItem("hellUsers")) || [];
  const currentUser = users.find((user) => user.email === currentUserEmail);
  return currentUser ? currentUser.sizeChoice : null;
}

function createCards(cardSet, totalCardsNeeded) {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  // const selectedCards = this.cardSet.slice(0, 8)
  const { values, images } = cardSet;
  gameState.cardImages = images;

  const selectedValues = values.slice(0, totalCardsNeeded / 2);
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
  const memorySize = getMemorySize();
  if (!cardSet || !cardSet.values) {
    alert("Erreur : jeu de cartes introuvables");
    return;
  }

  const totalCardsNeeded = getTotalCardsNeeded(memorySize);
  if (totalCardsNeeded > cardSet.value.length) {
    alert(
      "Pas assez de cartes pour cette taille. Veuillez choisir une taille plus petite"
    );
    return;
  }
  createCards(cardSet, totalCardsNeeded);
}

function getTotalCardsNeeded(sizeChoice) {
  switch (sizeChoice) {
    case "3x3":
      return 9;
    case "4x4":
      return 16;
    case "5x5":
      return 25;
    default:
      return 0;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault(); // Empêche le comportement par défaut de la barre d'espace
    location.reload();
  }
});

document.addEventListener("DOMContentLoaded", initializeGame);
