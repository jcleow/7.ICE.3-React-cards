import React, { useState } from 'react';
import { shuffleCards, makeDeck } from './deck.mjs';

export default function App() {
  console.log('running');

  // winner will be undefined here
  console.log(winner, 'winner');

  // set the default value of the deck
  const [deck, setDeck] = useState(shuffleCards(makeDeck()));

  // set the default player hand as empty
  const [playerHand, setPlayerHand] = useState([deck.pop(), deck.pop()]);
  const [computerHand, setComputerHand] = useState([deck.pop(), deck.pop()]);

  // Can use setState as an alternative
  // const [winner, setWinner] = useState('null');

  // Track the winner
  let winner;

  // create the deal button click handler
  const dealCards = () => {
    // This will not update winner outside of dealCards function
    winner = 'Akira';

    // This works inside the dealCards function
    console.log(winner, 'winner in dealcards');
    // Deal cards into player hands
    const playerHandCards = [deck.pop(), deck.pop()];
    setPlayerHand(playerHandCards);

    // Deal cards into computer hands
    const computerHandCards = [deck.pop(), deck.pop()];
    setComputerHand(computerHandCards);

    // Update the deck
    setDeck([...deck]);
  };

  // render the cards in the hand
  // note that when this renders the first time and the hand is
  // empty, it doesnt require and special condition
  const playerHandEls = playerHand.map(({ name, suit }) => (
    <div>
      {name}
      {suit}
    </div>
  ));

  const computerHandEls = computerHand.map(({ name, suit }) => (
    <div>
      {name}
      {suit}
    </div>
  ));
  // winner will be undefined here
  console.log(winner, 'winner');
  let highPlayerCard;
  let highComputerCard;

  // Compares the rank of the cards
  // Compare within player's hand
  if (playerHand[0].rank > playerHand[1].rank) {
    [highPlayerCard] = playerHand;
  } else if (playerHand[0].rank <= playerHand[1].rank) {
    highPlayerCard = playerHand[1];
  }

  // Compare within computer's hand
  if (computerHand[0].rank > computerHand[1].rank) {
    [highComputerCard] = computerHand;
  } else if (computerHand[0].rank <= computerHand[1].rank) {
    highComputerCard = computerHand[1];
  }

  // Compare both cards
  if (highPlayerCard.rank > highComputerCard.rank) {
    winner = 'player';
    // setWinner('player')
  } else if (highPlayerCard.rank < highComputerCard.rank) {
    winner = 'computer';
    // setWinner('computer');
  } else {
    winner = 'draw';
    // setWinner('draw');
  }
  // *** Notes *** //
  // checkWin(); --> Good idea to encapsulate the
  // checkwin logic above into a function and then call the function here
  // to evaluate the game

  // Good to place the logic of checkWin() inside App()
  // as this fits in the context of the entire game

  // How to structure the code
  // ^ Get all the logic for the checkWin() above done and get all the variables ready
  // V Pass down all the variables needed to render in the return statement below

  // dealCards is unable to affect the variable outside of its function i.e using winner
  // to update - does not hook back to the App UNLESS we are using the setState() function

  // Difficult things to do in React are to decide
  // 1. where to put the functions
  // 2. and when to create a new component
  return (
    <div>
      <div>
        {playerHand.length}
        <h3>cards:</h3>
        <h2>Player's Hand</h2>
        {playerHandEls}
        <h2>Computer's Hand</h2>
        {computerHandEls}
        <h2>Result</h2>
        {winner}
      </div>
      <p>
        <button onClick={dealCards}>deal</button>
      </p>
    </div>
  );
}
