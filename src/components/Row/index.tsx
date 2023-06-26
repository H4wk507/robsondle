import { TRow } from "../../types";
import Square from "../Square";

interface RowProps {
  row: TRow;
}

export default function Row({ row }: RowProps) {
  return (
    <div className="row">
      {row.map((letter, i) => (
        <Square letter={letter} key={i} />
      ))}
    </div>
  );
}
