import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";

const LOCATIONS = [
  "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune",
  "Kolkata", "Ahmedabad", "Noida", "Gurgaon", "Jaipur", "Chandigarh",
  "Kochi", "Indore", "Bhopal", "Remote", "Hybrid - Bangalore",
  "Hybrid - Mumbai", "Hybrid - Hyderabad", "Hybrid - Delhi",
];

const SALARY_RANGES = [
  { label: "Any Salary",          min: "",      max: "" },
  { label: "Up to ₹15,000",       min: "",      max: "15000" },
  { label: "₹15,000 – ₹30,000",  min: "15000", max: "30000" },
  { label: "₹30,000 – ₹60,000",  min: "30000", max: "60000" },
  { label: "₹60,000 – ₹1,00,000",min: "60000", max: "100000" },
  { label: "Above ₹1,00,000",     min: "100000",max: "" },
];

const SORT_OPTIONS = [
  { label: "Newest First",    value: "-created_at" },
  { label: "Oldest First",    value: "created_at" },
  { label: "Salary: High→Low",value: "-salary" },
  { label: "Salary: Low→High",value: "salary" },
  { label: "Title A–Z",       value: "title" },
  { label: "Title Z–A",       value: "-title" },
];

const PAGE_SIZE = 12;

function Jobs() {
  const [jobs,        setJobs]        = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [total,       setTotal]       = useState(0);
  const [page,        setPage]        = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(true);

  // ── Filter state ────────────────────────────────
  const [search,      setSearch]      = useState("");
  const [jobType,     setJobType]     = useState("");
  const [location,    setLocation]    = useState("");
  const [salaryIdx,   setSalaryIdx]   = useState(0);
  const [sort,        setSort]        = useState("-created_at");

  // ── Debounce search ──────────────────────────────
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  // ── Reset page when filters change ──────────────
  useEffect(() => { setPage(1); }, [debouncedSearch, jobType, location, salaryIdx, sort]);

  // ── Fetch jobs ───────────────────────────────────
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const salRange = SALARY_RANGES[salaryIdx];
      const params = new URLSearchParams();
      if (debouncedSearch) params.set("search",     debouncedSearch);
      if (jobType)         params.set("job_type",   jobType);
      if (location)        params.set("location",   location);
      if (salRange.min)    params.set("min_salary", salRange.min);
      if (salRange.max)    params.set("max_salary", salRange.max);
      if (sort)            params.set("sort",       sort);

      const res = await axios.get(`/api/jobs/?${params}`);
      setJobs(res.data);
      setTotal(res.data.length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, jobType, location, salaryIdx, sort]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const clearFilters = () => {
    setSearch(""); setJobType(""); setLocation("");
    setSalaryIdx(0); setSort("-created_at");
  };

  const hasFilters = search || jobType || location || salaryIdx !== 0 || sort !== "-created_at";

  // ── Pagination slice ─────────────────────────────
  const paginated   = jobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages  = Math.ceil(jobs.length / PAGE_SIZE);

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", background: "var(--off-white)" }}>

      {/* ── Top bar ────────────────────────────────── */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", padding: "20px 32px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>

            {/* Search */}
            <div style={{ position: "relative", flex: "1", minWidth: "260px" }}>
              <span style={{
                position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                color: "var(--text-muted)", fontSize: "1rem", pointerEvents: "none",
              }}>🔍</span>
              <input
                id="job-search"
                type="text"
                placeholder="Search title, company, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "40px", minWidth: "100%" }}
              />
            </div>

            {/* Job Type */}
            <select
              id="filter-type"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="form-select"
              style={{ width: "160px", flexShrink: 0 }}
            >
              <option value="">All Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
            </select>

            {/* Location */}
            <select
              id="filter-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-select"
              style={{ width: "180px", flexShrink: 0 }}
            >
              <option value="">All Locations</option>
              {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>

            {/* Salary */}
            <select
              id="filter-salary"
              value={salaryIdx}
              onChange={(e) => setSalaryIdx(Number(e.target.value))}
              className="form-select"
              style={{ width: "200px", flexShrink: 0 }}
            >
              {SALARY_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
            </select>

            {/* Sort */}
            <select
              id="filter-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="form-select"
              style={{ width: "180px", flexShrink: 0 }}
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            {/* Clear */}
            {hasFilters && (
              <button onClick={clearFilters} className="btn btn-outline" style={{ flexShrink: 0, padding: "10px 16px", fontSize: "0.85rem" }}>
                ✕ Clear
              </button>
            )}
          </div>

          {/* Active filter chips */}
          {hasFilters && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
              {search && <Chip label={`"${search}"`} onRemove={() => setSearch("")} />}
              {jobType && <Chip label={jobType} onRemove={() => setJobType("")} />}
              {location && <Chip label={location} onRemove={() => setLocation("")} />}
              {salaryIdx !== 0 && <Chip label={SALARY_RANGES[salaryIdx].label} onRemove={() => setSalaryIdx(0)} />}
              {sort !== "-created_at" && <Chip label={SORT_OPTIONS.find(o => o.value === sort)?.label} onRemove={() => setSort("-created_at")} />}
            </div>
          )}
        </div>
      </div>

      {/* ── Main content ────────────────────────────── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 32px" }}>

        {/* Results header */}
        {!loading && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "8px" }}>
            <div>
              <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--navy)" }}>{total}</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}> {total === 1 ? "job" : "jobs"} found</span>
              {hasFilters && <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}> · filtered results</span>}
            </div>
            {totalPages > 1 && (
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                Page {page} of {totalPages}
              </span>
            )}
          </div>
        )}

        {/* States */}
        {loading ? (
          <LoadingGrid />
        ) : jobs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h3>No jobs found</h3>
            <p style={{ marginTop: "8px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
              Try adjusting your filters or clearing the search.
            </p>
            <button onClick={clearFilters} className="btn btn-primary" style={{ marginTop: "20px" }}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="jobs-grid">
              {paginated.map((job) => <JobCard key={job.id} job={job} />)}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "40px", flexWrap: "wrap" }}>
                <button
                  onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo(0, 0); }}
                  disabled={page === 1}
                  className="btn btn-outline"
                  style={{ padding: "8px 18px", fontSize: "0.88rem", opacity: page === 1 ? 0.4 : 1 }}
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((item, i) =>
                    item === "..." ? (
                      <span key={`dot-${i}`} style={{ color: "var(--text-muted)", padding: "0 4px" }}>…</span>
                    ) : (
                      <button
                        key={item}
                        onClick={() => { setPage(item); window.scrollTo(0, 0); }}
                        style={{
                          width: "38px", height: "38px", borderRadius: "var(--radius-sm)",
                          border: page === item ? "none" : "1.5px solid var(--border)",
                          background: page === item ? "var(--navy)" : "var(--white)",
                          color: page === item ? "white" : "var(--text-body)",
                          fontWeight: page === item ? 700 : 400,
                          cursor: "pointer", fontSize: "0.88rem",
                          transition: "var(--transition)",
                        }}
                      >
                        {item}
                      </button>
                    )
                  )
                }

                <button
                  onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo(0, 0); }}
                  disabled={page === totalPages}
                  className="btn btn-outline"
                  style={{ padding: "8px 18px", fontSize: "0.88rem", opacity: page === totalPages ? 0.4 : 1 }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────────── */

function Chip({ label, onRemove }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      background: "var(--accent-light)", color: "var(--accent)",
      border: "1px solid #c8d9f5", borderRadius: "20px",
      padding: "3px 10px", fontSize: "0.8rem", fontWeight: 600,
    }}>
      {label}
      <button onClick={onRemove} style={{
        background: "none", border: "none", cursor: "pointer",
        color: "var(--accent)", fontSize: "0.9rem", padding: 0, lineHeight: 1,
      }}>×</button>
    </span>
  );
}

function LoadingGrid() {
  return (
    <div className="jobs-grid">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} style={{
          background: "var(--white)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)", padding: "24px", minHeight: "200px",
          animation: "pulse 1.5s ease-in-out infinite",
        }}>
          <div style={{ height: "18px", background: "var(--light-gray)", borderRadius: "4px", marginBottom: "12px", width: "70%" }} />
          <div style={{ height: "14px", background: "var(--light-gray)", borderRadius: "4px", marginBottom: "8px", width: "50%" }} />
          <div style={{ height: "14px", background: "var(--light-gray)", borderRadius: "4px", marginBottom: "20px", width: "40%" }} />
          <div style={{ height: "38px", background: "var(--light-gray)", borderRadius: "var(--radius-md)" }} />
        </div>
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  );
}

export default Jobs;