import { GameBoard, Move } from "../hooks/useGameLogic";

function checkRow(
  game: GameBoard,
  player: number,
  moveRow: number,
  size: number
): boolean {
  if (!game) return false;

  for (let col = 0; col < size; col++) {
    if (game[moveRow][col] !== player) return false;
  }
  return true;
}

function checkCol(
  game: GameBoard,
  player: number,
  moveCol: number,
  size: number
): boolean {
  if (!game) return false;

  for (let row = 0; row < size; row++) {
    if (game[row][moveCol] !== player) return false;
  }

  return true;
}

function checkDiagonals(
  game: GameBoard,
  player: number,
  move: Move,
  size: number
): boolean {
  if (!game) return false;

  let isWin = false;
  if (move.row === move.col) {
    isWin = true;
    for (let i = 0; i < size; i++) {
      if (game[i][i] !== player) {
        isWin = false;
        break;
      }
    }
  }

  if (move.row + move.col === size - 1) {
    isWin = true;
    for (let i = 0; i < size; i++) {
      if (game[i][size - 1 - i] !== player) {
        isWin = false;
        break;
      }
    }
  }

  return isWin;
}

export { checkCol, checkDiagonals, checkRow };
