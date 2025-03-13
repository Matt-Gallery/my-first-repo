const deck = [
  { value: "7", suit: "♥" },
  { value: "8", suit: "♥" },
  { value: "9", suit: "♥" },
  { value: "10", suit: "♥" },
  { value: "J", suit: "♥" },
  { value: "Q", suit: "♥" },
  { value: "K", suit: "♥" },
  { value: "A", suit: "♥" },
  { value: "7", suit: "♦" },
  { value: "8", suit: "♦" },
  { value: "9", suit: "♦" },
  { value: "10", suit: "♦" },
  { value: "J", suit: "♦" },
  { value: "Q", suit: "♦" },
  { value: "K", suit: "♦" },
  { value: "A", suit: "♦" },
  { value: "7", suit: "♣" },
  { value: "8", suit: "♣" },
  { value: "9", suit: "♣" },
  { value: "10", suit: "♣" },
  { value: "J", suit: "♣" },
  { value: "Q", suit: "♣" },
  { value: "K", suit: "♣" },
  { value: "A", suit: "♣" },
  { value: "7", suit: "♠" },
  { value: "8", suit: "♠" },
  { value: "9", suit: "♠" },
  { value: "10", suit: "♠" },
  { value: "J", suit: "♠" },
  { value: "Q", suit: "♠" },
  { value: "K", suit: "♠" },
  { value: "A", suit: "♠" },
];

let playerHands = {
  player1: [],
  player2: [],
  player3: [],
  player4: [],
};

function dealCards() {
  if (playerHands.player1.length !== 0) {
    return;
  }
  // Shuffle the deck using Fisher-Yates algorithm
  for (let i = deck.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  // Distribute cards to players
  const players = Object.keys(playerHands);
  let cardIndex = 0;

  while (cardIndex < deck.length) {
    for (let player of players) {
      if (cardIndex < deck.length && playerHands[player].length < 8) {
        playerHands[player].push(deck[cardIndex]);
        cardIndex++;
      }
    }
  }
}
dealCards();

//Perplexity AI
function sortPlayerHands(playerHands) {
// Define a helper function to get the rank of a card value
const cardRank = (value) => {
  const ranks = { "7": 1, "8": 2, "9": 3, "10": 4, "J": 5, "Q": 6, "K": 7, "A": 8 };
  return ranks[value];
};

// Iterate over each player's hand
for (let player in playerHands) {
  const hand = playerHands[player];

  // Group cards by suit and count occurrences
  const suitGroups = hand.reduce((acc, card) => {
    if (!acc[card.suit]) acc[card.suit] = [];
    acc[card.suit].push(card);
    return acc;
  }, {});

  // Convert suit groups to an array of [suit, cards] pairs
  const sortedSuits = Object.entries(suitGroups).sort((a, b) => b[1].length - a[1].length);

  // Sort cards within each suit by value
  const sortedHand = [];
  for (let [suit, cards] of sortedSuits) {
    cards.sort((a, b) => cardRank(a.value) - cardRank(b.value));
    sortedHand.push(...cards);
  }

  // Update the player's hand with the sorted hand
  playerHands[player] = sortedHand;
}
}

// Call the function to sort player hands
sortPlayerHands(playerHands);
console.log(playerHands);
// Perplexity AI
function countPlayerSuits(playerHands) {
const result = {};
for (const [player, cards] of Object.entries(playerHands)) {
  const suitCount = { '♣': 0, '♠': 0, '♥': 0, '♦': 0 };
  for (const card of cards) {
    suitCount[card.suit]++;
  }
  result[player] = suitCount;
}
return result;
}

const suitCounts = countPlayerSuits(playerHands);
console.log(suitCounts);

function findSuitsWithMostElements(playerHands) {
const player2Cards = playerHands.player2;

// Create a suit counter object
const suitCount = {
  '♣': 0, '♠': 0, '♥': 0, '♦': 0
};

// Count occurrences of each suit
for (const card of player2Cards) {
  suitCount[card.suit]++;
}

// Find the maximum count
const maxCount = Math.max(...Object.values(suitCount));

// Find all suits with the maximum count
const suitsWithMostElements = Object.entries(suitCount)
  .filter(([suit, count]) => count === maxCount)
  .map(([suit]) => suit);

return {
  suits: suitsWithMostElements,
  count: maxCount
};
}

// Example usage:
const result = findSuitsWithMostElements(playerHands);
console.log('Suits with most elements:', result);

function findLowestCardFromMostCommonSuits(playerHands) {
const player2Cards = playerHands.player2;

// Create a suit counter object
const suitCount = {
  '♣': 0, '♠': 0, '♥': 0, '♦': 0
};

// Count occurrences of each suit
for (const card of player2Cards) {
  suitCount[card.suit]++;
}

// Find the maximum count
const maxCount = Math.max(...Object.values(suitCount));

// Find all suits with the maximum count
const suitsWithMostElements = Object.entries(suitCount)
  .filter(([suit, count]) => count === maxCount)
  .map(([suit]) => suit);

// Create value ranking system
const cardRanks = {
  '7': 1, '8': 2, '9': 3, '10': 4, 'J': 5, 'Q': 6, 'K': 7, 'A': 8
};

// Find the lowest card from the most common suits
let lowestCard = null;
let lowestRank = Infinity;

for (const card of player2Cards) {
  if (suitsWithMostElements.includes(card.suit)) {
    const rank = cardRanks[card.value];
    if (rank < lowestRank) {
      lowestRank = rank;
      lowestCard = card;
    }
  }
}

return {
  suits: suitsWithMostElements,
  count: maxCount,
  lowestCard: lowestCard
};
}

// Example usage:
const firstPlay = findLowestCardFromMostCommonSuits(playerHands);
console.log('Result:', firstPlay);

function removeCardFromPlayer2Hand(playerHands, firstPlay) {

const player2Hand = playerHands.player2;
const cardToRemove = firstPlay.lowestCard;

const index = player2Hand.findIndex(card => 
  card.value === cardToRemove.value && card.suit === cardToRemove.suit
);

if (index !== -1) {
  player2Hand.splice(index, 1);
  console.log(`Removed card: ${cardToRemove.value}${cardToRemove.suit}`);
}
}

// Example usage:
removeCardFromPlayer2Hand(playerHands, firstPlay);
console.log("Updated player2 hand:", playerHands.player2);

function selectLowestCardSameSuit(playerHands, firstPlay) {
const player3Hand = playerHands.player3;
const firstPlaySuit = firstPlay.lowestCard.suit;

// Filter cards of the same suit
const sameSuitCards = player3Hand.filter(card => card.suit === firstPlaySuit);

if (sameSuitCards.length === 0) {
  console.log("Player 3 has no cards of the same suit");
  return null;
}

// Find the lowest ranked card
const lowestCard = sameSuitCards.reduce((lowest, current) => {
  if (cardRanks[current.value] < cardRanks[lowest.value]) {
    return current;
  }
  return lowest;
});

return lowestCard;
}

// Example usage:
// Assuming firstPlay is defined, e.g.:
// const firstPlay = { value: "9", suit: "♥" };
const selectedCard = selectLowestCardSameSuit(playerHands, firstPlay);
console.log("Selected card:", selectedCard);