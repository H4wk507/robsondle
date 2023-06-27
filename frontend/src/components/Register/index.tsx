import UserForm from "../UserForm";
import { FormData } from "../../helpers/types";
import { useNavigate } from "react-router-dom";
import { API_REGISTER_URL } from "../../helpers/constants";

export default function Register() {
  const navigate = useNavigate();

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
          `Error during registration ${res.statusText} ${res.status}`,
        );
      navigate("/login"); // TODO: login instantly
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <UserForm title="register" submitBtnText="Register" onSubmit={onSubmit} />
  );
}
