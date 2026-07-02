import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get("/api/applications/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusClass = (status) => {
    const s = status?.toLowerCase();
    if (s === "approved" || s === "accepted") return "status-badge status-approved";
    if (s === "rejected") return "status-badge status-rejected";
    return "status-badge status-pending";
  };

  return (
    <div className="page-wrapper">

      <div className="page-header">
        <h1>My Applications</h1>
        <p>Track the status of all your job applications</p>
      </div>

      {loading ? (
        <div className="empty-state">
          <div className="empty-state-icon">⏳</div>
          <h3>Loading your applications...</h3>
        </div>
      ) : applications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <h3>No applications yet</h3>
          <p style={{ marginTop: "8px", fontSize: "0.9rem" }}>
            Start applying to jobs to see them here.
          </p>
        </div>
      ) : (
        <div className="fade-in">
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "20px" }}>
            {applications.length} {applications.length === 1 ? "application" : "applications"} found
          </p>

          {applications.map((app) => (
            <div key={app.id} className="app-card">
              <div>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--navy)", marginBottom: "4px" }}>
                  Job #{app.job}
                </h2>
                <p style={{ fontSize: "0.83rem", color: "var(--text-muted)" }}>
                  Applied on {new Date(app.applied_at).toLocaleDateString("en-IN", {
                    year: "numeric", month: "short", day: "numeric",
                  })}
                </p>
              </div>

              <span className={getStatusClass(app.status)}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default MyApplications;