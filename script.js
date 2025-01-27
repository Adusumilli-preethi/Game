// app.js
const gameContainer = document.querySelector('.game-container');
let flippedCards = [];
let matchedCards = 0;
let mismatches = 0;  // Counter for mismatches
let totalPairs = 7;  // Now we have 7 pairs of cards (15 cards total)

// Create an array of card values
let cardValues = [];
for (let i = 1; i <= totalPairs; i++) {
  cardValues.push(i, i); // Two of each value
}

// Shuffle the card values
cardValues = cardValues.sort(() => Math.random() - 0.5);

// Create cards dynamically
function createCards() {
  cardValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = value; // Display the number on the back

    card.appendChild(cardFront);
    card.appendChild(cardBack);

    gameContainer.appendChild(card);
  });
}

createCards();

// Add event listeners for card flipping
gameContainer.addEventListener('click', (event) => {
  const clickedCard = event.target.closest('.card');

  // Ignore clicks on already flipped or unmatched cards
  if (!clickedCard || clickedCard.classList.contains('flipped') || flippedCards.length === 2) {
    return;
  }

  clickedCard.classList.add('flipped');
  flippedCards.push(clickedCard);

  // Check for match if two cards are flipped
  if (flippedCards.length === 2) {
    setTimeout(() => {
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedCards++;
        if (matchedCards === totalPairs) {
          alert('You win!');
        }
      } else {
        // Mismatch: flip back the cards
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        
        // Increment mismatch counter
        mismatches++;
        if (mismatches >= 5) {
          alert('You lose! Too many mismatches.');
          resetGame();
          return;
        }
      }

      flippedCards = []; // Reset flipped cards without flipping them back
    }, 1000); // Wait for flip animation before checking
  }
});

// Reset the game if the player loses
function resetGame() {
  // Reset game state
  gameContainer.innerHTML = ''; // Clear the board
  flippedCards = [];
  matchedCards = 0;
  mismatches = 0;

  // Recreate the cards
  cardValues = [];
  for (let i = 1; i <= totalPairs; i++) {
    cardValues.push(i, i); // Two of each value
  }
  cardValues = cardValues.sort(() => Math.random() - 0.5); // Shuffle the cards
  createCards();
}
