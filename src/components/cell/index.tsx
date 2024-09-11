import "./cell.css";
import { Move, PlayerID, playerMap } from "../../hooks/useGameLogic";

interface CellProps {
  value: PlayerID;
  position: Move;
  handleMove: (position: Move) => void;
}

const Cell: React.FC<CellProps> = ({ value, handleMove, position }) => {
  function handleClick() {
    handleMove(position);
  }

  return (
    <>
      <div
        className="cell"
        style={{ opacity: value > 0 ? 1 : value }}
        onClick={handleClick}
      >
        {playerMap[value]}
      </div>
    </>
  );
};

export default Cell;
