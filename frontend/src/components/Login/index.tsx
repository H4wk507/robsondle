import { useForm } from "react-hook-form";
import { CookieSetOptions } from "universal-cookie";

interface LoginData {
  name: string;
  password: string;
}

interface LoginProps {
  setCookie: (
    name: "sessionToken",
    value: string,
    options?: CookieSetOptions | undefined,
  ) => void;
}

export default function Login({ setCookie }: LoginProps) {
  const { register, handleSubmit } = useForm<LoginData>();

  const onSubmit = async (loginData: LoginData) => {
    try {
      const res = await fetch("http://192.168.0.103/api/users/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const sessionToken = await res.json();
      setCookie("sessionToken", sessionToken, { path: "/" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form">
        <div className="form-title">Login</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="name"
            type="text"
            placeholder="login"
            {...register("name")}
          />
          <input
            className="password"
            type="password"
            placeholder="password"
            {...register("password")}
          />
          <div className="submit-btn-container">
            <button className="submit-btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
