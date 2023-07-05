import { useCallback, useEffect, useState } from "react";
import { GameState, OpenModal, TGrid, TRow } from "../../helpers/types";
import Grid from "../Grid";
import {
  API_WORD_URL,
  NLETTERS,
  NROWS,
  VALIDCHARACTERS,
} from "../../helpers/constants";
import Category from "../Category";
import WonModal from "../Modals/WonModal";
import { getEmptyGrid } from "../../helpers/utils";
import styles from "./style.module.scss";
import { useCookies } from "react-cookie";
import LostModal from "../Modals/LostModal";

export default function Wordle() {
  const [grid, setGrid] = useState<TGrid>(getEmptyGrid());
  const [currentRow, setCurrentRow] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  const [guessWord, setGuessWord] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [numberOfTries, setNumberOfTries] = useState(0);
  const [cookies] = useCookies(["sessionToken"]);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [open, setOpen] = useState<OpenModal>(null);

  const matchWord = useCallback(
    (word: TRow) => {
      if (word.length !== guessWord.length) {
        return false;
      }
      for (let i = 0; i < word.length; i++) {
        if (word[i].value !== guessWord[i]) {
          return false;
        }
      }
      return true;
    },
    [guessWord],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      let letter = e.key;
      if (gameState !== "playing") {
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
        if (currentChar === NLETTERS && currentRow < NROWS) {
          setNumberOfTries(numberOfTries + 1);
          console.log(numberOfTries + "попытка");
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
                        val.value === guessWord[j]
                          ? "green"
                          : guessWord.includes(val.value!)
                          ? "yellow"
                          : "black",
                    }
                  : { ...val },
              ),
            ),
          );
          if (matchWord(word)) {
            setGameState("won");
            setOpen("won");
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
    [
      guessWord,
      matchWord,
      currentChar,
      currentRow,
      grid,
      numberOfTries,
      gameState,
    ],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API_WORD_URL - zwraca slowo zwiazane z aktualna sesja
        // API_INITIALIZE_URL - inizjalizuje nowe slowo do aktualnej sesji
        const res = await fetch(API_WORD_URL);
        const { prompt, categories } = await res.json();
        console.log(categories);
        const randomCategory =
          categories[Math.floor(Math.random() * categories.length)];
        setGuessWord(prompt);
        setCategory(randomCategory);
        console.log(prompt);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cookies.sessionToken]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (numberOfTries === NROWS && gameState === "playing") {
      setGameState("lost");
      setOpen("lost");
    }
  }, [numberOfTries, gameState]);

  return (
    <div className={styles.main}>
      <WonModal
        setGameState={setGameState}
        open={open}
        setOpen={setOpen}
        setGrid={setGrid}
        setCurrentRow={setCurrentRow}
        setCurrentChar={setCurrentChar}
        guessWord={guessWord}
        setGuessWord={setGuessWord}
        setCategory={setCategory}
        numberOfTries={numberOfTries}
        setNumberOfTries={setNumberOfTries}
      />
      <LostModal
        setGameState={setGameState}
        open={open}
        setOpen={setOpen}
        setGrid={setGrid}
        setCurrentRow={setCurrentRow}
        setCurrentChar={setCurrentChar}
        guessWord={guessWord}
        setGuessWord={setGuessWord}
        setCategory={setCategory}
        numberOfTries={numberOfTries}
        setNumberOfTries={setNumberOfTries}
      />
      <Category category={category} />
      <Grid grid={grid} />
    </div>
  );
}
