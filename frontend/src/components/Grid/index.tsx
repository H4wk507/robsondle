import { TGrid } from "../../helpers/types";
import Row from "../Row";

interface GridProps {
  grid: TGrid;
}

export default function Grid({ grid }: GridProps) {
  return (
    <div className="grid">
      {grid.map((row, i) => (
        <Row row={row} key={i} />
      ))}
    </div>
  );
}
