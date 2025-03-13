/*-------------------------------- Constants --------------------------------*/
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

const cardRanks = {
  '7': 1, '8': 2, '9': 3, '10': 4, 'J': 5, 'Q': 6, 'K': 7, 'A': 8
};
/*---------------------------- Variables (state) ----------------------------*/
let playerHands = {
  player1: [],
  player2: [],
  player3: [],
  player4: [],
};
/*------------------------------- Functions -------------------------------*/
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
/*-------------------------------- Functions --------------------------------*/
//Perplexity AI
/*------ Sort Player Hands by most cards in suit then low to high -----------*/
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

/*------ Count the numnber of cards of each suit in each players hand -------*/
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

/*---- Player 2 plays first card - lowest card of the suit they have the most of -----*/
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
  lowestCard: lowestCard
};
}

// Example usage:
const firstPlay = findLowestCardFromMostCommonSuits(playerHands);
console.log('Result:', firstPlay);

/*---- Remove the first card that Player 2 played from their hand -----*/
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

/*---- Player 3 plays first card - the lowest card of the same suit that player 2 played,
  else their highest card -----*/
function selectCardFromPlayer3(playerHands, firstPlay) {
  const player3Cards = playerHands.player3;
  const targetSuit = firstPlay.lowestCard.suit;

  // Define card ranks
  const cardRanks = {
    '7': 1, '8': 2, '9': 3, '10': 4, 'J': 5, 'Q': 6, 'K': 7, 'A': 8
  };

  // Filter cards with the same suit
  const sameRankCards = player3Cards.filter(card => card.suit === targetSuit);

  if (sameRankCards.length > 0) {
    // Find the lowest card of the same suit
    return sameRankCards.reduce((lowest, current) => 
      cardRanks[current.value] < cardRanks[lowest.value] ? current : lowest
    );
  } else {
    // If no matching suit, return the highest value card
    return player3Cards.reduce((highest, current) => 
      cardRanks[current.value] > cardRanks[highest.value] ? current : highest
    );
  }
}

const player3Card = selectCardFromPlayer3(playerHands, firstPlay);
console.log('Player 3 selected card:', player3Card);

/*---- Remove the first card that Player 3 played from their hand -----*/
// Example usage:
function removeCardFromPlayer3Hand(playerHands, player3Card) {
  const player3Hand = playerHands.player3;
  
  const index = player3Hand.findIndex(card => 
    card.value === player3Card.value && card.suit === player3Card.suit
  );

  if (index !== -1) {
    player3Hand.splice(index, 1);
    console.log(`Removed card: ${player3Card.value}${player3Card.suit} from Player 3's hand`);
  }
}

// Example usage:
removeCardFromPlayer3Hand(playerHands, player3Card);
console.log("Updated player3 hand:", playerHands.player3);

/*---- Player 4 plays first card - the lowest card of the same suit that player 2 played,
  else their highest card -----*/
function selectCardFromPlayer4(playerHands, firstPlay) {
  const player4Cards = playerHands.player4;
  const targetSuit = firstPlay.lowestCard.suit;

  // Define card ranks
  const cardRanks = {
    '7': 1, '8': 2, '9': 3, '10': 4, 'J': 5, 'Q': 6, 'K': 7, 'A': 8
  };

  // Filter cards with the same suit
  const sameRankCards = player4Cards.filter(card => card.suit === targetSuit);

  if (sameRankCards.length > 0) {
    // Find the lowest card of the same suit
    return sameRankCards.reduce((lowest, current) => 
      cardRanks[current.value] < cardRanks[lowest.value] ? current : lowest
    );
  } else {
    // If no matching suit, return the highest value card
    return player4Cards.reduce((highest, current) => 
      cardRanks[current.value] > cardRanks[highest.value] ? current : highest
    );
  }
}
const player4Card = selectCardFromPlayer4(playerHands, firstPlay);
console.log('Player 4 selected card:', player4Card);

/*---- Remove the first card that Player 4 played from their hand -----*/

function removeCardFromPlayer4Hand(playerHands, player4Card) {
  const player4Hand = playerHands.player4;
  
  const index = player4Hand.findIndex(card => 
    card.value === player4Card.value && card.suit === player4Card.suit
  );

  if (index !== -1) {
    player4Hand.splice(index, 1);
    console.log(`Removed card: ${player4Card.value}${player4Card.suit} from Player 4's hand`);
  }
}

// Example usage:
removeCardFromPlayer4Hand(playerHands, player4Card);
console.log("Updated player4 hand:", playerHands.player4);

