import { TLetter } from "../../helpers/types";

interface SquareProps {
  letter: TLetter;
}

export default function Square({ letter }: SquareProps) {
  return (
    <div className={`square ${letter.color && letter.color}`}>
      {letter.value}
    </div>
  );
}
