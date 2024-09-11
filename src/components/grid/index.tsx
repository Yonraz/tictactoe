import { Move, PlayerID } from "../../hooks/useGameLogic";
import Cell from "../cell";
import "./grid.css";

interface GridProps {
  game?: Array<PlayerID[]>;
  onMove: (position: Move) => void;
}

const GameGrid: React.FC<GridProps> = ({ game, onMove }) => {
  if (!game) return null;

  return (
    <>
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${game[0].length}, 1fr)` }}
      >
        {game.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((col, colIndex) => (
              <div className="cell" key={colIndex}>
                <Cell
                  key={`${rowIndex}${colIndex}`}
                  value={col as PlayerID}
                  handleMove={onMove}
                  position={{ row: rowIndex, col: colIndex }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default GameGrid;
