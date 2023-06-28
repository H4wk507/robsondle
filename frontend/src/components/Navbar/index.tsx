import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["sessionToken"]);

  const loggedIn = cookies.sessionToken;

  return (
    <div className="navbar">
      <button
        onClick={() => {
          loggedIn
            ? removeCookie("sessionToken", { path: "/" })
            : navigate("/login");
        }}
        className="login-btn"
      >
        {loggedIn ? "Logout" : "Login"}
      </button>
      {!loggedIn && (
        <button onClick={() => navigate("/register")} className="register-btn">
          Register
        </button>
      )}
    </div>
  );
}
