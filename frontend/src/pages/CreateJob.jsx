import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateJob() {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    job_type: "Internship",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const createJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("access");
    try {
      await axios.post("/api/jobs/", job, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/jobs");
    } catch (error) {
      console.log(error.response?.data);
      setError("Failed to create job. Please make sure you are logged in as an employer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper-center">
      <div className="form-card-wide fade-in">

        <div style={{ marginBottom: "28px" }}>
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>🏢</div>
          <h1 className="form-title">Post a Job</h1>
          <p className="form-subtitle">Fill in the details to publish a new job listing</p>
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

        <form onSubmit={createJob}>
          <div className="form-group">
            <label className="form-label">Job Title</label>
            <input
              id="cj-title"
              name="title"
              type="text"
              placeholder="e.g. Frontend Developer"
              value={job.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div className="form-group">
              <label className="form-label">Company</label>
              <input
                id="cj-company"
                name="company"
                type="text"
                placeholder="Company name"
                value={job.company}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                id="cj-location"
                name="location"
                type="text"
                placeholder="City or Remote"
                value={job.location}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
            <div className="form-group">
              <label className="form-label">Salary (₹/month)</label>
              <input
                id="cj-salary"
                name="salary"
                type="text"
                placeholder="e.g. 50000"
                value={job.salary}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Job Type</label>
              <select
                id="cj-type"
                name="job_type"
                value={job.job_type}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Internship">Internship</option>
                <option value="Part-time">Part-time</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Job Description</label>
            <textarea
              id="cj-description"
              name="description"
              placeholder="Describe responsibilities, requirements, and benefits..."
              value={job.description}
              onChange={handleChange}
              className="form-textarea"
              rows={4}
            />
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              id="cj-submit"
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: 2 }}
            >
              {loading ? "Publishing..." : "Publish Job →"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default CreateJob;