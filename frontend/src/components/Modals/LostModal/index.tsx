
import { useCookies } from "react-cookie";
import { API_INITIALIZE_URL } from "../../../helpers/constants";
import { TGrid } from "../../../helpers/types";
import { getEmptyGrid } from "../../../helpers/utils";
import modalStyles from "../style.module.scss";
import styles from "./style.module.scss";

interface LostModalProps {
  openLost: boolean;
  setOpenLost: (openLost: boolean) => void;
  setGrid: (grid: TGrid) => void;
  setCurrentRow: (row: number) => void;
  setCurrentChar: (char: number) => void;
  setHasLost: (hasLost: boolean) => void;
  guessWord: string;
  setGuessWord: (guessWord: string) => void;
  setCategory: (category: string) => void;
  numberOfTries: number;
  setNumberOfTries: (numberOfTries: number) => void;
}

export default function LostModal({
  openLost,
  setOpenLost,
  setGrid,
  setCurrentRow,
  setCurrentChar,
  setHasLost,
  guessWord,
  setGuessWord,
  setCategory,
  numberOfTries,
  setNumberOfTries,
}: LostModalProps) {
  const [cookies] = useCookies(["sessionToken"]);

  const resetGame = async () => {
    setGrid(getEmptyGrid());
    setCurrentRow(0);
    setCurrentChar(0);
    setHasLost(false);
    setNumberOfTries(0);
    const res = await fetch(API_INITIALIZE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.sessionToken,
      },
    });
    const { prompt, categories } = await res.json();
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    console.log(prompt);
    setGuessWord(prompt);
    setCategory(randomCategory);
  };

  return (
    <>
      {openLost && (
        <>
          <div
            onClick={() => setOpenLost(false)}
            className={modalStyles.backdrop}
          ></div>
          <div className={modalStyles["modal-container"]}>
            <div className={modalStyles["modal"]}>
              <p>
                You have lost!
              </p>
              <p>The correct word was '{guessWord}'.</p>
              <button
                onClick={() => {
                  setOpenLost(false);
                  resetGame();
                }}
                className={styles["play-again"]}
              >
                Play again
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}