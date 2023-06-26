import { useCallback, useEffect, useState } from "react";
import { TGrid, TLetter, TRow } from "../../types";
import Grid from "../Grid";

const nrows = 6;
const nletters = 5;

const validCharacters = "abcdefghijklmnopqrstuvwxyząćęłńóśźż".split("");

export default function Wordle() {
  const [grid, setGrid] = useState<TGrid>(
    new Array<TRow>(nrows)
      .fill([])
      .map(() =>
        new Array<TLetter>(nletters).fill({ value: null, color: null }),
      ),
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [guessWord, setGuessWord] = useState<string | null>(null);

  const matchWord = (word: TRow) => {
    if (word.length !== guessWord!.length) {
      return false;
    }
    for (let i = 0; i < word.length; i++) {
      if (word[i].value !== guessWord![i]) {
        return false;
      }
    }
    return true;
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      let letter = e.key;
      if (hasWon) {
        return;
      }
      if (letter === "Backspace") {
        if (currentChar > 0) {
          setGrid(
            grid.map((row, i) =>
              row.map((val, j) =>
                i === currentRow && j === currentChar - 1
                  ? { ...val, value: null }
                  : { ...val },
              ),
            ),
          );
          setCurrentChar(currentChar - 1);
        }
      } else if (letter === "Enter") {
        if (currentChar === nletters && currentRow < nrows) {
          setCurrentRow(currentRow + 1);
          setCurrentChar(0);
          const word = grid[currentRow];
          setGrid(
            grid.map((row, i) =>
              row.map((val, j) =>
                i === currentRow
                  ? {
                      ...val,
                      color:
                        val.value === guessWord![j]
                          ? "green"
                          : guessWord?.includes(val.value)
                          ? "yellow"
                          : null,
                    }
                  : { ...val },
              ),
            ),
          );
          if (matchWord(word)) {
            setHasWon(true);
          }
        }
      }
      letter = letter.toLowerCase();
      if (!validCharacters.includes(letter)) {
        return;
      } else if (currentChar < nletters) {
        setGrid(
          grid.map((row, i) =>
            row.map((val, j) =>
              i === currentRow && j === currentChar
                ? { ...val, value: letter }
                : { ...val },
            ),
          ),
        );
        setCurrentChar(currentChar + 1);
      }
    },
    [guessWord, matchWord, currentChar, currentRow, grid, hasWon],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://192.168.0.103/api/prompts/random");
        const word = await res.text();
        setGuessWord(word);
        console.log(word);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="main">
      <Grid grid={grid} />
    </div>
  );
}
