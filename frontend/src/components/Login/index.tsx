import React, { useState } from "react";
import { CookieSetOptions } from "universal-cookie";
import UserForm from "../UserForm";
import { FormData } from "../../helpers/types";
import { API_LOGIN_URL } from "../../helpers/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setCookie: (
    name: "sessionToken",
    value: string,
    options?: CookieSetOptions | undefined
  ) => void;
}

export default function Login({ setCookie }: LoginProps) {
  const navigate = useNavigate();

  const onSubmit = async (formData: FormData) => {
    try {
      const res = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Incorrect request ${res.status}: ${res.statusText}`);
      }

      const sessionToken = await res.text();
      setCookie("sessionToken", sessionToken, { path: "/" });
      toast.success("Successful login!", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Please try again.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <UserForm title="login" submitBtnText="Log in" onSubmit={onSubmit} />
    </>
  );
}
