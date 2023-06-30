import { TRow } from "../../helpers/types";
import Square from "../Square";
import styles from "./style.module.scss";

interface RowProps {
  row: TRow;
}

export default function Row({ row }: RowProps) {
  return (
    <div className={styles.row}>
      {row.map((letter, i) => (
        <Square letter={letter} key={i} />
      ))}
    </div>
  );
}
