import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="job-card fade-in">

      <div>
        <h2 className="job-card-title">{job.title}</h2>
        <p className="job-card-company">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          {job.company}
        </p>
      </div>

      <div className="job-card-meta">
        <span className="job-badge">📍 {job.location}</span>
        <span className="job-badge">💼 {job.job_type}</span>
        <span className="job-badge-salary">₹ {job.salary}</span>
      </div>

      <button
        onClick={() => navigate(`/apply/${job.id}`)}
        className="btn btn-primary btn-full"
        style={{ marginTop: "8px" }}
      >
        Apply Now →
      </button>

    </div>
  );
}

export default JobCard;