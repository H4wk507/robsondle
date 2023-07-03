import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserForm from "../UserForm";
import { FormData } from "../../helpers/types";
import { API_REGISTER_URL } from "../../helpers/constants";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setCookies] = useCookies(["sessionToken"]);
  const navigate = useNavigate();

  const onSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const res = await fetch(API_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok)
        throw new Error(
          `Error during registration ${res.statusText} ${res.status}`,
        );
      const sessionToken = await res.text();
      setCookies("sessionToken", sessionToken, { path: "/" });
      navigate("/");
    } catch (err) {
      toast.error("Username is already taken. Please choose another one.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <UserForm
        title="Register"
        submitBtnText={isLoading ? "Loading..." : "Register"}
        onSubmit={onSubmit}
      />
    </>
  );
}
