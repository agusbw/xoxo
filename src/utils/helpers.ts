import type { CellValue } from '../types';

export function checkWinner(boardState: CellValue[][]): null | 1 | 2 | 3 {
  // horizontal winning condition
  for (let i = 0; i < boardState.length; i++) {
    if (
      boardState[i][0] !== null &&
      boardState[i][0] === boardState[i][1] &&
      boardState[i][0] === boardState[i][2]
    ) {
      return boardState[i][0];
    }
  }

  // vertical winning condition
  for (let i = 0; i < boardState.length; i++) {
    if (
      boardState[0][i] !== null &&
      boardState[0][i] === boardState[1][i] &&
      boardState[0][i] === boardState[2][i]
    ) {
      return boardState[0][i];
    }
  }

  // diagonal winning condition
  if (
    (boardState[0][0] !== null &&
      boardState[0][0] === boardState[1][1] &&
      boardState[0][0] === boardState[2][2]) ||
    (boardState[0][2] !== null &&
      boardState[0][2] === boardState[1][1] &&
      boardState[0][2] === boardState[2][0])
  ) {
    return boardState[1][1];
  }

  // draw condition
  let isDraw = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (boardState[i][j] === null) {
        isDraw = false;
        break;
      }
    }
    if (!isDraw) break;
  }
  if (isDraw) return 3;

  return null;
}
