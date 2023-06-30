import { TLetter } from "../../helpers/types";
import styles from "./style.module.scss";

interface SquareProps {
  letter: TLetter;
}

export default function Square({ letter }: SquareProps) {
  return (
    <div className={`${styles.square} ${letter.color && styles[letter.color]}`}>
      {letter.value}
    </div>
  );
}
