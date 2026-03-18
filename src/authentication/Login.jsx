import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import Logo from "../Components/Logo";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const { login, isPending } = useLogin();
  const navigate = useNavigate();

  function formValidate() {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValidate()) return;
    login({ email: formData.email, password: formData.password });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <main className={styles.login}>
      <Logo />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            disabled={isPending}
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            style={{ borderColor: error.email ? "#ef4444" : "" }}
          />
          {error.email && <p style={{ color: "#ef4444" }}>{error.email}</p>}
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            disabled={isPending}
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            style={{ borderColor: error.password ? "#ef4444" : "" }}
          />
          {error.password && (
            <p style={{ color: "#ef4444" }}>{error.password}</p>
          )}
        </div>

        <div>
          <Button type="primary" disabled={isPending}>
            {isPending ? "Logging in..." : "Log In"}
          </Button>
        </div>
        <div>
          <span style={{ fontSize: "12px", paddingRight: "10px" }}>
            Don&apos;t have an account?{" "}
          </span>
          <button type="button" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </div>
      </form>
    </main>
  );
}
