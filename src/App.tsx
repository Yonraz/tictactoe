import "./App.css";
import GameGrid from "./components/grid";
import useGameLogic, { Move, PlayerID, playerMap } from "./hooks/useGameLogic";

function App() {
  const { currentGame, currentPlayer, onMove, startGame, winner } =
    useGameLogic({ size: 3, numPlayers: 2 });

  function handleMove(position: Move) {
    if (!currentPlayer) return;
    onMove(currentPlayer as PlayerID, position);
  }

  return (
    <>
      {!winner ? (
        <>
          <h1>Current Player is {playerMap[currentPlayer]}</h1>
         <GameGrid game={currentGame} onMove={handleMove} />
        </>
      ) : (
        <>
          <h1>Winner is {playerMap[winner]}</h1>
          <button onClick={startGame}>Restart?</button>
        </>
      )}
    </>
  );
}

export default App;
