import { useCallback, useEffect, useState } from "react";
import { checkCol, checkDiagonals, checkRow } from "../utils/gameValidations";

export const playerMap: Record<number, string> = {
  0: "-",
  1: "X",
  2: "O",
};

export type PlayerID = 0 | 1 | 2;
export type Move = { col: number; row: number };

export type GameBoard = Array<PlayerID[]>;

export default function useGameLogic({
  size,
  numPlayers,
}: {
  size: number;
  numPlayers: number;
}) {
  const [currentGame, setCurrentGame] = useState<GameBoard>();
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(0);

  const startGame = useCallback(() => {
    const game = Array.from({ length: size }, () =>
      new Array<PlayerID>(size).fill(0)
    );
    setCurrentPlayer(getRandomPlayer(numPlayers));
    setCurrentGame(game);
    setWinner(0);
  }, [size, numPlayers]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  function onMove(player: PlayerID, move: Move) {
    if (!currentGame) return;
    const newGame = currentGame.map((row) => [...row]);
    newGame[move.row][move.col] = player;
    setCurrentGame(newGame);

    if (isWin(newGame, player, move)) handleGameOver(player);

    setCurrentPlayer((prev) => (prev % numPlayers) + 1);
  }

  function handleGameOver(winner: PlayerID) {
    setWinner(winner);
  }

  function isWin(game: GameBoard, player: number, move: Move): boolean {
    return (
      checkRow(game, player, move.row, size) ||
      checkCol(game, player, move.col, size) ||
      checkDiagonals(game, player, move, size)
    );
  }

  return {
    currentGame,
    currentPlayer,
    onMove,
    startGame,
    winner,
  };
}

function getRandomPlayer(numPlayers: number): React.SetStateAction<number> {
  return (Math.floor(Math.random() * numPlayers) + 1) as PlayerID;
}
