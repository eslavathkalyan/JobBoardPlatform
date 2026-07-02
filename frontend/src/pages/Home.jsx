import { useState } from "react";
import { Link } from "react-router-dom";

/* ── FAQ data ─────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "How do I search for jobs on JobBoard?",
    a: "Go to 'Browse Jobs' and use the search bar to type any keyword — job title, company name, or location. You can also filter by job type (Full-Time, Part-Time, Internship), city, salary range, and sort results your way. Results update instantly.",
  },
  {
    q: "Do I need to create an account to browse jobs?",
    a: "No! You can browse all available job listings without signing in. However, to apply for any job, you will need to create a free account as a Job Seeker.",
  },
  {
    q: "What is the difference between a Job Seeker and an Employer account?",
    a: "A Job Seeker account lets you apply for jobs and track your applications. An Employer account lets you post new job listings and manage applications received for your postings. You choose your role at registration.",
  },
  {
    q: "How do I apply for a job?",
    a: "Find a job you like on the Browse Jobs page, click 'Apply Now', upload your resume (PDF or DOC), and submit. That's it! You can track your application status from your 'My Applications' page after logging in.",
  },
  {
    q: "How do I post a job as an employer?",
    a: "Register or log in as an Employer, then click 'Post a Job' in the top navigation. Fill in the job title, company name, location, salary, job type, and description. Your listing goes live instantly and is visible to all job seekers.",
  },
  {
    q: "What types of jobs are available on JobBoard?",
    a: "JobBoard lists Full-Time, Part-Time, and Internship positions across industries including Software Engineering, Data Science, Design, Product, Marketing, Finance, and more. Jobs are from companies across India and also include Remote/Hybrid roles.",
  },
  {
    q: "How can I track my job applications?",
    a: "After logging in, go to 'Applications' in the navbar. You'll see all the jobs you've applied to along with their current status — Pending, Approved, or Rejected — and the date you applied.",
  },
  {
    q: "Is JobBoard free to use?",
    a: "Yes! JobBoard is completely free for job seekers to browse and apply for jobs. Employers can also post job listings for free. Our goal is to connect talent with opportunity without any barriers.",
  },
  {
    q: "Can I filter jobs by salary?",
    a: "Absolutely. On the Browse Jobs page, use the Salary Range filter to select your preferred range — from under ₹15,000/month all the way up to above ₹1,00,000/month. Combine it with job type and location filters for the best results.",
  },
  {
    q: "What should I include in my resume before applying?",
    a: "Make sure your resume includes your contact information, a brief professional summary, work experience or internship history, education, and key skills relevant to the job. A clean, single-page PDF resume in English works best.",
  },
];

/* ── Feature cards ───────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: "🔍",
    title: "Smart Job Search",
    desc: "Search across 100+ jobs by title, company, location, or keyword. Filter by job type and salary range.",
  },
  {
    icon: "⚡",
    title: "One-Click Apply",
    desc: "Upload your resume and apply to any job in seconds. No lengthy forms, no confusion.",
  },
  {
    icon: "📊",
    title: "Track Applications",
    desc: "See the status of every application you've submitted — Pending, Approved, or Rejected — all in one place.",
  },
  {
    icon: "🏢",
    title: "Top Companies",
    desc: "Explore opportunities from 40+ leading companies including Google, TCS, Razorpay, Zomato, and more.",
  },
  {
    icon: "🌍",
    title: "Remote & Hybrid",
    desc: "Find work-from-home, hybrid, and on-site roles across 20 cities and remote locations in India.",
  },
  {
    icon: "📋",
    title: "Post Jobs Easily",
    desc: "Employers can publish job listings instantly with full details — no approval needed, no waiting.",
  },
];

/* ── Stats ───────────────────────────────────────────────────────── */
const STATS = [
  { value: "120+", label: "Active Jobs" },
  { value: "40+",  label: "Companies" },
  { value: "20+",  label: "Cities" },
  { value: "Free", label: "Always" },
];

function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ background: "var(--off-white)" }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="hero-section">
        <div className="hero-content fade-in">

          <div className="hero-badge">🇮🇳 India's Job Discovery Platform</div>

          <h1 className="hero-title">
            Find Your<br /><span>Perfect Career</span><br />Opportunity
          </h1>

          <p className="hero-subtitle">
            Browse 120+ real jobs from top Indian companies.<br />
            Filter, apply, and get hired — all in one place.
          </p>

          <div className="hero-actions">
            <Link to="/jobs" className="btn btn-primary" id="hero-browse">
              Browse Jobs →
            </Link>
            <Link to="/register" className="btn btn-outline" id="hero-register">
              Create Free Account
            </Link>
          </div>

          {/* Stats row */}
          <div style={{
            display: "flex", gap: "40px", justifyContent: "center",
            flexWrap: "wrap", marginTop: "56px",
          }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--navy)" }}>{s.value}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500, marginTop: "2px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--white)", padding: "80px 32px", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "12px" }}>
            How It Works
          </p>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "var(--navy)", marginBottom: "48px" }}>
            Get hired in 3 simple steps
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px" }}>
            {[
              { num: "01", title: "Create Account", desc: "Sign up free as a Job Seeker. Takes less than 60 seconds." },
              { num: "02", title: "Browse & Filter", desc: "Search 120+ jobs by role, city, salary, or job type." },
              { num: "03", title: "Apply & Track", desc: "Upload your resume and track application status live." },
            ].map((step) => (
              <div key={step.num} style={{ textAlign: "center", padding: "24px" }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%",
                  background: "var(--accent-light)", color: "var(--accent)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem", fontWeight: 800, margin: "0 auto 16px",
                  border: "2px solid #c8d9f5",
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: "1.05rem", color: "var(--navy)", marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════ */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "12px" }}>
              Platform Features
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "var(--navy)" }}>
              Everything you need to land your next job
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {FEATURES.map((f) => (
              <div key={f.title} className="card" style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{
                  fontSize: "1.5rem", background: "var(--light-gray)",
                  borderRadius: "var(--radius-md)", padding: "10px",
                  flexShrink: 0, lineHeight: 1,
                }}>
                  {f.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: "0.97rem", color: "var(--navy)", marginBottom: "6px" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.86rem", color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section style={{ background: "var(--white)", borderTop: "1px solid var(--border)", padding: "80px 32px" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "12px" }}>
              Frequently Asked Questions
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "var(--navy)" }}>
              Common questions about job searching
            </h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px", fontSize: "0.95rem" }}>
              Everything you need to know before getting started.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  border: `1px solid ${openFaq === i ? "var(--accent)" : "var(--border)"}`,
                  borderRadius: "var(--radius-md)",
                  background: openFaq === i ? "var(--accent-light)" : "var(--white)",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Question row */}
                <button
                  id={`faq-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", padding: "18px 22px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    gap: "16px", background: "none", border: "none",
                    cursor: "pointer", textAlign: "left",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <span style={{
                    fontWeight: 600, fontSize: "0.95rem",
                    color: openFaq === i ? "var(--accent)" : "var(--text-dark)",
                    flex: 1,
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    color: openFaq === i ? "var(--accent)" : "var(--text-muted)",
                    fontSize: "1.2rem", flexShrink: 0, fontWeight: 300,
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease", display: "inline-block",
                  }}>
                    +
                  </span>
                </button>

                {/* Answer */}
                {openFaq === i && (
                  <div style={{
                    padding: "0 22px 18px",
                    fontSize: "0.9rem", color: "var(--text-body)",
                    lineHeight: 1.7,
                    animation: "fadeInUp 0.2s ease",
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)",
        padding: "72px 32px", textAlign: "center",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "white", marginBottom: "14px" }}>
            Ready to find your dream job?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", marginBottom: "32px" }}>
            Join thousands of professionals who found their next opportunity on JobBoard.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register" className="btn" style={{ background: "white", color: "var(--navy)", fontWeight: 700 }}>
              Create Free Account
            </Link>
            <Link to="/jobs" className="btn" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1.5px solid rgba(255,255,255,0.4)" }}>
              Browse Jobs →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "var(--white)", borderTop: "1px solid var(--border)",
        padding: "24px 32px", textAlign: "center",
        fontSize: "0.83rem", color: "var(--text-muted)",
      }}>
        © 2026 JobBoard Platform · Built with ❤️ for job seekers across India
      </footer>
    </div>
  );
}

export default Home;