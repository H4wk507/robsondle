import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import helpCircle from "/help-circle-outline.svg";
import { useState } from "react";
import HelpModal from "../Modals/HelpModal";
import styles from "./style.module.scss";

export default function Navbar() {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["sessionToken"]);
  const [open, setOpen] = useState(false);

  const loggedIn = cookies.sessionToken;

  return (
    <div className={styles.navbar}>
      <HelpModal open={open} setOpen={setOpen} />
      <div className={styles.left}>
        <div onClick={() => navigate("/")} className={styles.title}>
          Robsondle
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.help}>
          <img onClick={() => setOpen(true)} src={helpCircle} />
        </div>
        <button
          onClick={() => {
            loggedIn
              ? removeCookie("sessionToken", { path: "/" })
              : navigate("/login");
          }}
          className={styles["login-btn"]}
        >
          {loggedIn ? "Logout" : "Login"}
        </button>
        {!loggedIn && (
          <button
            onClick={() => navigate("/register")}
            className={styles["register-btn"]}
          >
            Register
          </button>
        )}
      </div>
    </div>
  );
}
