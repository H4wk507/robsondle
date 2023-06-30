import { useForm } from "react-hook-form";
import { FormData } from "../../helpers/types";
import styles from "./style.module.scss";

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
  // TODO: add typing, submitting and error state on button click
  return (
    <>
      <div className={styles.content}>
        <div className={styles.form}>
          <div className={styles["form-title"]}>{title}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className={styles.name}
              type="text"
              placeholder="username"
              {...register("name")}
            />
            <input
              className={styles.password}
              type="password"
              placeholder="password"
              {...register("password")}
            />
            <div className={styles["submit-btn-container"]}>
              <button className={styles["submit-btn"]}>{submitBtnText}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
