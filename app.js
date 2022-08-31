const cards = document.querySelectorAll(".memory-card");

let cardIsFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  // this.classList.toggle("flip");
  this.classList.add("flip");
  if (!cardIsFlipped) {
    // first click -> first Card
    cardIsFlipped = true;
    firstCard = this;
    return;
    // console.log({ cardIsFlipped, firstCard });
  }
  // second click -> second Card

  secondCard = this;
  checkForMatch();
  // console.log({ firstCard, secondCard });

  //Checking whether the cards match

  // console.log(firstCard.dataset.name);
  // console.log(secondCard.dataset.name);
}
function checkForMatch() {
  let isMatched = firstCard.dataset.name === secondCard.dataset.name;
  isMatched ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard;
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [cardIsFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
// IIFE -> immediately function Expression -> FUnction is called immediately after its definition
(function shuffle() {
  cards.forEach(function (card) {
    let randomPositions = Math.floor(Math.random() * 12);

    card.style.order = randomPositions;
  });
})();
cards.forEach(function (card) {
  card.addEventListener("click", flipCard);
});
