import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import "../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      // 🔥 IMPORTANT (handles both cases)
      const token = res.data.token || res.data.access_token;

      if (!token) {
        throw new Error("No auth token returned");
      }

      localStorage.setItem("token", token);
      navigate("/notes", { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p className="switch-link">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
