import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const applyJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("access");
    const formData = new FormData();
    formData.append("job", id);
    formData.append("resume", resume);
    formData.append("status", "Pending");

    try {
      await axios.post("/api/applications/", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/my-applications");
    } catch (error) {
      console.log(error.response?.data);
      setError("Failed to submit application. Please make sure you are logged in and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper-center">
      <div className="form-card fade-in">

        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>📄</div>
          <h1 className="form-title">Apply for Job</h1>
          <p className="form-subtitle">Submit your resume to apply for this position</p>
        </div>

        <div style={{
          background: "var(--accent-light)",
          border: "1px solid #c8d9f5",
          borderRadius: "var(--radius-sm)",
          padding: "12px 16px",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <span style={{ color: "var(--accent)", fontSize: "1.1rem" }}>🔖</span>
          <span style={{ fontSize: "0.88rem", color: "var(--navy)", fontWeight: 500 }}>
            Job ID: <strong>#{id}</strong>
          </span>
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

        <form onSubmit={applyJob}>
          <div className="form-group">
            <label className="form-label">Upload Resume (PDF, DOC)</label>
            <input
              id="apply-resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
              className="form-file"
              required
            />
            {resume && (
              <span style={{ fontSize: "0.82rem", color: "var(--success)", marginTop: "4px" }}>
                ✅ {resume.name}
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline"
              style={{ flex: 1 }}
            >
              ← Back
            </button>
            <button
              id="apply-submit"
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: 2 }}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default ApplyJob;