import UserForm from "../UserForm";
import { FormData } from "../../helpers/types";
import { useNavigate } from "react-router-dom";
import { API_REGISTER_URL } from "../../helpers/constants";
import { useCookies } from "react-cookie";

export default function Register() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["sessionToken"]);

  const onSubmit = async (formData: FormData) => {
    try {
      const res = await fetch(API_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok)
        throw new Error(
          `Error during registration ${res.statusText} ${res.status}`
        );
      const sessionToken = await res.text();
      setCookies("sessionToken", sessionToken, { path: "/" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return cookies.sessionToken ? (
    <div>You are already logged in!</div>
  ) : (
    <UserForm title="register" submitBtnText="Register" onSubmit={onSubmit} />
  );
}
