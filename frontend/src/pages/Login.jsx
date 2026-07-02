import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/login/", {
        username,
        password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      // Full reload so Navbar re-reads auth state from localStorage
      window.location.href = "/dashboard";
    } catch (error) {
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper-center">
      <div className="form-card fade-in">

        {/* Back to home */}
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "24px", fontWeight: 500 }}>
          ← Back to Home
        </Link>

        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>👤</div>
          <h1 className="form-title">Welcome back</h1>
          <p className="form-subtitle">Sign in to your account to continue</p>
        </div>

        {error && (
          <div style={{
            background: "var(--danger-light)",
            border: "1px solid #f5c6c2",
            borderRadius: "var(--radius-sm)",
            padding: "10px 14px",
            color: "var(--danger)",
            fontSize: "0.87rem",
            marginBottom: "20px",
          }}>
            {error}
          </div>
        )}

        <form onSubmit={loginUser}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              id="login-username"
              type="text"
              placeholder="Enter your username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            id="login-submit"
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
            style={{ marginTop: "8px" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="divider" />

        <p style={{ textAlign: "center", fontSize: "0.88rem", color: "var(--text-muted)" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--accent)", fontWeight: 600 }}>
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;