import { useCookies } from "react-cookie";
import { API_INITIALIZE_URL } from "../../../helpers/constants";
import { GameState, OpenModal, TGrid } from "../../../helpers/types";
import { getEmptyGrid } from "../../../helpers/utils";
import modalStyles from "../style.module.scss";
import styles from "./style.module.scss";

interface LostModalProps {
  setGameState: (gameState: GameState) => void;
  open: OpenModal;
  setOpen: (open: OpenModal) => void;
  setGrid: (grid: TGrid) => void;
  setCurrentRow: (row: number) => void;
  setCurrentChar: (char: number) => void;
  guessWord: string;
  setGuessWord: (guessWord: string) => void;
  setCategory: (category: string) => void;
  numberOfTries: number;
  setNumberOfTries: (numberOfTries: number) => void;
}

export default function LostModal({
  setGameState,
  open,
  setOpen,
  setGrid,
  setCurrentRow,
  setCurrentChar,
  guessWord,
  setGuessWord,
  setCategory,
  setNumberOfTries,
}: LostModalProps) {
  const [cookies] = useCookies(["sessionToken"]);

  const resetGame = async () => {
    setGrid(getEmptyGrid());
    setCurrentRow(0);
    setCurrentChar(0);
    setGameState("playing");
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
      {open === "lost" && (
        <>
          <div
            onClick={() => setOpen(null)}
            className={modalStyles.backdrop}
          ></div>
          <div className={modalStyles["modal-container"]}>
            <div className={modalStyles["modal"]}>
              <p>You have lost!</p>
              <p>The correct word was '{guessWord}'.</p>
              <button
                onClick={() => {
                  setOpen(null);
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
