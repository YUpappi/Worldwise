import { useNavigate } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";
import { useForm } from "react-hook-form";
import Button from "../Components/Button";
import Logo from "../Components/Logo";
import styles from "./Login.module.css";

function SignUpForm() {
  const navigate = useNavigate();
  const { signup, isPending } = useSignUp();
  const { handleSubmit, register, formState, getValues } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => {
          navigate("/App");
        },
      },
    );
  }
  return (
    <main className={styles.login}>
      <Logo />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="fullName">Full Name</label>
          <input
            disabled={isPending}
            type="text"
            id="fullName"
            name="fullName"
            style={{ borderColor: errors.fullName ? "#ef4444" : "" }}
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <p style={{ color: "#ef4444" }}>{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            disabled={isPending}
            type="email"
            id="email"
            name="email"
            style={{ borderColor: errors.email ? "#ef4444" : "" }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "please enter avalid email address",
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "#ef4444" }}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            disabled={isPending}
            type="password"
            id="password"
            name="password"
            style={{ borderColor: errors.password ? "#ef4444" : "" }}
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 8,
                message: "password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            <p style={{ color: "#ef4444" }}>{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            disabled={isPending}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            style={{ borderColor: errors.confirmPassword ? "#ef4444" : "" }}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues().password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p style={{ color: "#ef4444" }}>{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="primary" disabled={isPending}>
          {isPending ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </main>
  );
}

export default SignUpForm;
