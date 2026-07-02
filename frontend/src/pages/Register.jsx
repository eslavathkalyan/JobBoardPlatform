import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "job_seeker",
    phone: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/users/register/", form);
      setSuccess(true);
    } catch (error) {
      setError("Registration failed. Please check your details and try again.");
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="page-wrapper-center">
        <div className="form-card fade-in" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
          <h2 className="form-title">Registration Successful!</h2>
          <p className="form-subtitle" style={{ marginBottom: "24px" }}>
            Your account has been created. You can now sign in.
          </p>
          <Link to="/login" className="btn btn-primary">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper-center">
      <div className="form-card-wide fade-in">

        {/* Back to home */}
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "24px", fontWeight: 500 }}>
          ← Back to Home
        </Link>

        <div style={{ marginBottom: "28px" }}>
          <h1 className="form-title">Create Account</h1>
          <p className="form-subtitle">Join thousands of professionals on JobBoard. It's free!</p>
        </div>

        {/* Benefit pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
          {["Browse 120+ Jobs", "One-Click Apply", "Track Applications", "100% Free"].map((b) => (
            <span key={b} style={{
              background: "var(--success-light)", color: "var(--success)",
              fontSize: "0.78rem", fontWeight: 600, padding: "4px 12px",
              borderRadius: "20px", border: "1px solid #b7e4cc",
            }}>
              ✓ {b}
            </span>
          ))}
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

        <form onSubmit={registerUser}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                id="reg-username"
                type="text"
                name="username"
                placeholder="Choose a username"
                className="form-input"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                id="reg-email"
                type="email"
                name="email"
                placeholder="your@email.com"
                className="form-input"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              id="reg-password"
              type="password"
              name="password"
              placeholder="Create a strong password"
              className="form-input"
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                id="reg-phone"
                type="text"
                name="phone"
                placeholder="+91 00000 00000"
                className="form-input"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                id="reg-location"
                type="text"
                name="location"
                placeholder="City, State"
                className="form-input"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">I am a...</label>
            <select
              id="reg-role"
              name="role"
              className="form-select"
              onChange={handleChange}
            >
              <option value="job_seeker">Job Seeker — Looking for opportunities</option>
              <option value="employer">Employer — Hiring talent</option>
            </select>
          </div>

          <button
            id="reg-submit"
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
            style={{ marginTop: "8px" }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="divider" />

        <p style={{ textAlign: "center", fontSize: "0.88rem", color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--accent)", fontWeight: 600 }}>
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;