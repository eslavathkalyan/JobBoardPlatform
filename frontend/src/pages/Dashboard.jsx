import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get(
          "/api/users/dashboard/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const stats = [
    { icon: "👤", label: "Username",        value: data.username || "—" },
    { icon: "🏷️",  label: "Account Role",   value: data.role ? data.role.replace("_", " ") : "—" },
    { icon: "💼", label: "Total Jobs",       value: data.total_jobs ?? "—" },
    { icon: "📋", label: "My Applications",  value: data.applications ?? "—" },
  ];

  return (
    <div className="page-wrapper">

      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back{data.username ? `, ${data.username}` : ""}! Here's an overview of your account.</p>
      </div>

      {loading ? (
        <div className="empty-state">
          <div className="empty-state-icon">⏳</div>
          <h3>Loading your dashboard...</h3>
        </div>
      ) : (
        <div className="stats-grid fade-in">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value" style={{ fontSize: typeof stat.value === "string" && stat.value.length > 8 ? "1.3rem" : "2rem" }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Dashboard;