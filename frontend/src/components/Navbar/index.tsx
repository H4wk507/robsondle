import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import helpCircle from "/help-circle-outline.svg";
import { useState } from "react";
import HelpModal from "../Modals/HelpModal";
import styles from "./style.module.scss";

export default function Navbar() {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["sessionToken"]);
  const [open, setOpen] = useState(false);

  const loggedIn = cookies.sessionToken;

  const handleLogout = () => {
    removeCookie("sessionToken", { path: "/" });
    navigate("/login");
  };

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
          <img onClick={() => setOpen(true)} src={helpCircle} alt="Help" />
        </div>
        {loggedIn ? (
          <>
            <button onClick={handleLogout} className={styles["login-btn"]}>
              Logout
            </button>
            <Link to="/add-word" className={styles["addword-btn"]}>
              Add Word
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className={styles["login-btn"]}>
              Login
            </Link>
            <Link to="/register" className={styles["register-btn"]}>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
