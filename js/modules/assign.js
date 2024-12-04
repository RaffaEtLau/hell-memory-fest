export function assignCards() {
  for (let i = 0; i < cardsArray.length; i++) {
    backs[i].innerHTML = cardsArray[i];
  }
  backs.forEach(back => back.classList.remove("foundCard"))
}