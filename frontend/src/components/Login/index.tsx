import { CookieSetOptions } from "universal-cookie";
import UserForm from "../UserForm";
import { FormData } from "../../helpers/types";
import { API_LOGIN_URL } from "../../helpers/constants";

interface LoginProps {
  setCookie: (
    name: "sessionToken",
    value: string,
    options?: CookieSetOptions | undefined,
  ) => void;
}

export default function Login({ setCookie }: LoginProps) {
  const onSubmit = async (formData: FormData) => {
    try {
      const res = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const sessionToken = await res.json();
      setCookie("sessionToken", sessionToken, { path: "/" });
    } catch (err) {
      console.log(err);
    }
  };

  return <UserForm title="login" submitBtnText="Log in" onSubmit={onSubmit} />;
}
