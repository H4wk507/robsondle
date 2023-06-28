import { CookieSetOptions } from "universal-cookie";
import UserForm from "../UserForm";
import { FormData } from "../../helpers/types";
import { API_LOGIN_URL } from "../../helpers/constants";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setCookie: (
    name: "sessionToken",
    value: string,
    options?: CookieSetOptions | undefined,
  ) => void;
}

export default function Login({ setCookie }: LoginProps) {
  const navigate = useNavigate();

  const onSubmit = async (formData: FormData) => {
    // TODO: error checking
    try {
      const res = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok)
        throw new Error(`Incorrect request ${res.status}: ${res.statusText}`);
      const sessionToken = await res.text();
      setCookie("sessionToken", sessionToken, { path: "/" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return <UserForm title="login" submitBtnText="Log in" onSubmit={onSubmit} />;
}
