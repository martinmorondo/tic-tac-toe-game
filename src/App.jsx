import { useState } from 'react';
import confetti from 'canvas-confetti';

import { Square } from './components/Square';
import { TURNS } from './constants.js';
import { checkWinnerFrom, checkEndGame } from './logic/board';
import { WinnerModal } from './components/WinnerModal';
import { saveGameToStorage, resetGameStorage } from './logic/storage/index';

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if(boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  // null is that there is no winner, false is that there is a tie
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  const updateBoard = (index) => {
    // we do not update this position if you already have something
    if(board[index] || winner) return;
    // update the board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // change the shift
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // save game here
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    });
    // check for winner
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // tie
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe Game</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>  
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal 
      resetGame={resetGame} 
      winner={winner} 
      />
    </main>
  )
}

export default App;
