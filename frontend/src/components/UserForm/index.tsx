import { useForm } from "react-hook-form";
import { FormData } from "../../helpers/types";

interface UserFormProps {
  title: string;
  submitBtnText: string;
  onSubmit: (formData: FormData) => void;
}

export default function UserForm({
  title,
  submitBtnText,
  onSubmit,
}: UserFormProps) {
  const { register, handleSubmit } = useForm<FormData>();
  return (
    <>
      <div className="content">
        <div className="form">
          <div className="form-title">{title}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="name"
              type="text"
              placeholder="username"
              {...register("name")}
            />
            <input
              className="password"
              type="password"
              placeholder="password"
              {...register("password")}
            />
            <div className="submit-btn-container">
              <button className="submit-btn">{submitBtnText}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
