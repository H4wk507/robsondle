import { NROWS } from "../../../helpers/constants";
import modalStyles from "../style.module.scss";

interface HelpModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function HelpModal({ open, setOpen }: HelpModalProps) {
  return (
    <>
      {open && (
        <>
          <div
            className={modalStyles.backdrop}
            onClick={() => setOpen(false)}
          ></div>
          <div className={modalStyles["modal-container"]}>
            <div className={modalStyles.modal}>
              <p>How to play:</p>
              <p>Guess the Word in {NROWS} tries.</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
