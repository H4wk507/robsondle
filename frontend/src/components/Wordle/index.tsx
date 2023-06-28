import { useCallback, useEffect, useState } from "react";
import { TGrid, TRow } from "../../helpers/types";
import Grid from "../Grid";
import {
  API_INITIALIZE_URL,
  API_WORD_URL,
  NLETTERS,
  NROWS,
  VALIDCHARACTERS,
} from "../../helpers/constants";
import Category from "../Category";
import WonModal from "../WonModal";
import { getEmptyGrid } from "../../helpers/utils";

export default function Wordle() {
  const [grid, setGrid] = useState<TGrid>(getEmptyGrid());
  const [currentRow, setCurrentRow] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [guessWord, setGuessWord] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [numberOfTries, setNumberOfTries] = useState(0);

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
        setNumberOfTries(numberOfTries + 1);
        if (currentChar === NLETTERS && currentRow < NROWS) {
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
                          : guessWord?.includes(val.value!)
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
      if (!VALIDCHARACTERS.includes(letter)) {
        return;
      } else if (currentChar < NLETTERS) {
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
        const url =
          numberOfTries === NROWS || hasWon ? API_INITIALIZE_URL : API_WORD_URL;
        const res = await fetch(url);
        const { prompt } = await res.json();
        setGuessWord(prompt);
        console.log(prompt);
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

  useEffect(() => {
    if (hasWon) {
      setOpen(true);
    }
  }, [hasWon]);

  return (
    <div className="main">
      <WonModal
        open={open}
        setOpen={setOpen}
        setGrid={setGrid}
        setCurrentRow={setCurrentRow}
        setCurrentChar={setCurrentChar}
        guessWord={guessWord}
        setHasWon={setHasWon}
        setGuessWord={setGuessWord}
        numberOfTries={numberOfTries}
        setNumberOfTries={setNumberOfTries}
      />
      <Category />
      <Grid grid={grid} />
    </div>
  );
}
