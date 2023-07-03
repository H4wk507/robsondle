import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserForm from "../UserForm";
import { FormData } from "../../helpers/types";
import { API_REGISTER_URL } from "../../helpers/constants";

interface RegisterProps {
  onSuccess: () => void;
}

export default function Register({ onSuccess }: RegisterProps) {
  const [isLoading, setIsLoading] = useState(false);

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

      if (!res.ok) {
        throw new Error(`Incorrect request ${res.status}: ${res.statusText}`);
      }

      toast.success("Registration successful!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      onSuccess();
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
