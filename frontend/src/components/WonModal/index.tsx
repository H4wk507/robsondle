import { useCookies } from "react-cookie";
import { API_INITIALIZE_URL } from "../../helpers/constants";
import { TGrid, TRow } from "../../helpers/types";
import { getEmptyGrid } from "../../helpers/utils";

interface WonModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setGrid: (grid: TGrid) => void;
  setCurrentRow: (row: number) => void;
  setCurrentChar: (char: number) => void;
  setHasWon: (hasWon: boolean) => void;
  guessWord: string | null;
  setGuessWord: (guessWord: string | null) => void;
  numberOfTries: number;
  setNumberOfTries: (numberOfTries: number) => void;
}

export default function WonModal({
  open,
  setOpen,
  setGrid,
  setCurrentRow,
  setCurrentChar,
  setHasWon,
  guessWord,
  setGuessWord,
  numberOfTries,
  setNumberOfTries,
}: WonModalProps) {
  const [cookies] = useCookies(["sessionToken"]);
  const resetGame = async () => {
    setGrid(getEmptyGrid());
    setCurrentRow(0);
    setCurrentChar(0);
    setHasWon(false);
    setNumberOfTries(0);
    const res = await fetch(API_INITIALIZE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.sessionToken,
      },
    });
    const { prompt } = await res.json();
    console.log(prompt);
    setGuessWord(prompt);
  };

  return (
    <>
      {open && (
        <>
          <div onClick={() => setOpen(false)} className="backdrop"></div>
          <div className="modal-container">
            <div className="modal">
              <p>
                You have won after {numberOfTries}{" "}
                {numberOfTries === 1 ? "try" : "tries"}!
              </p>
              <p>The correct word was '{guessWord}'.</p>
              <button
                onClick={() => {
                  setOpen(false);
                  resetGame();
                }}
                className="play-again"
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
