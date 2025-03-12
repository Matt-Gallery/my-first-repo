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
  const valueRanks = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
    '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
  };

  // Find the lowest card from the most common suits
  let lowestCard = null;
  let lowestRank = Infinity;

  for (const card of player2Cards) {
    if (suitsWithMostElements.includes(card.suit)) {
      const rank = valueRanks[card.value];
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
const output = findLowestCardFromMostCommonSuits(playerHands);
console.log('Result:', output);

    //     // Find the suit with the most occurrences
    //     let mostCommonSuit = null;
    //     let maxCount = 0;
  
    //     for (const suit in suitCount) {
    //       if (suitCount[suit] > maxCount) {
    //         maxCount = suitCount[suit];
    //         mostCommonSuit = suit;
    //       }
    //     }
    //     return { mostCommonSuit, count: maxCount };
    //   }
    // }
    // findMostCommonSuit()
    //   console.log(findMostCommonSuit);
//       function getLowestCardsInMostCommonSuit(playerHands) {
//         const { mostCommonSuit } = findMostCommonSuit(playerHands);
//         const cardsInSuit = playerHands.player2.filter(
//           (card) => card.suit === mostCommonSuit
//         );
  
//         // Create value ranking system
//         const valueRanks = {
//           2: 2,
//           3: 3,
//           4: 4,
//           5: 5,
//           6: 6,
//           7: 7,
//           8: 8,
//           9: 9,
//           10: 10,
//           J: 11,
//           Q: 12,
//           K: 13,
//           A: 14,
//         };
  
//         // Sort cards by numerical value (ascending)
//         const sortedCards = cardsInSuit.sort(
//           (a, b) => valueRanks[a.value] - valueRanks[b.value]
//         );
  
//         return {
//           low1: sortedCards[0], // Lowest card
//           low2: sortedCards[1] || null, // Second lowest (null if only one exists)
//         };
//         function randomlySelectOneLowCard(playerHands) {
//           const { low1, low2 } = getLowestCardsInMostCommonSuit(playerHands);
  
//           // If only one card exists, return it; otherwise randomly pick one
//           if (!low2) return low1;
  
//           return Math.random() < 0.5 ? low1 : low2;
//         }
//       }
//     }
//   }

//   playHand();
//   console.log(Math.random() < 0.5 ? low1 : low2;);