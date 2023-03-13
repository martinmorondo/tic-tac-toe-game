import { WINNER_COMBOS } from '../constants';

export const checkWinnerFrom = (boardToCheck) => {
    // check all winning combinations
    // to see if X or O won
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
        return boardToCheck[a];
     }
}
    // if there is no winner: 
    return null;
};

export const chekEndGame = (newBoard) => {
    // we check if there is a tie
    // if there are no more empty spaces on the board
    return newBoard.every((square) => square !== null);
}