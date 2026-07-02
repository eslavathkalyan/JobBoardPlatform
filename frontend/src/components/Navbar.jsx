import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("access");

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Brand */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="navbar-brand">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
            Job<span>Board</span>
          </div>
        </Link>

        <div className="navbar-links">

          {/* Always visible */}
          <Link to="/"     className={`nav-link ${isActive("/")     ? "nav-link-active" : ""}`}>Home</Link>
          <Link to="/jobs" className={`nav-link ${isActive("/jobs") ? "nav-link-active" : ""}`}>Browse Jobs</Link>

          {isLoggedIn ? (
            /* ── Logged-in links ── */
            <>
              <Link to="/create-job"       className={`nav-link ${isActive("/create-job")       ? "nav-link-active" : ""}`}>Post a Job</Link>
              <Link to="/my-applications"  className={`nav-link ${isActive("/my-applications")  ? "nav-link-active" : ""}`}>Applications</Link>
              <Link to="/dashboard"        className={`nav-link ${isActive("/dashboard")        ? "nav-link-active" : ""}`}>Dashboard</Link>
              <button onClick={logout} className="nav-logout">Sign Out</button>
            </>
          ) : (
            /* ── Guest links ── */
            <>
              <Link to="/login"    className={`nav-link ${isActive("/login")    ? "nav-link-active" : ""}`}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: "8px 18px", fontSize: "0.88rem" }}>
                Get Started
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;