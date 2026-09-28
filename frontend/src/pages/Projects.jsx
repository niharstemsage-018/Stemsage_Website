import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";
import FilterBar from "../components/mock/FilterBar";
import MockModal from "../components/mock/MockModal";
import StatusBadge from "../components/mock/StatusBadge";
import { projects, projectCategories } from "../data/projects";

const ICON_MAP = {
  Robotics: "🤖", IoT: "📡", Electronics: "⚡",
  Programming: "💻", "AI/ML": "🧠", "3D Design": "🖨️",
};

const gridBg = {
  backgroundImage: "linear-gradient(to right, rgba(226,232,240,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,232,240,0.6) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

/* ─── Project Detail Modal ─── */
function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;
  return (
    <MockModal isOpen={!!project} onClose={onClose} title={project.title}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Status + Category */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <StatusBadge status={project.status} />
          <span style={{ fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "9999px", background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {project.category}
          </span>
        </div>

        {/* Overview */}
        <p style={{ margin: 0, color: "#475569", fontSize: "14px", lineHeight: 1.75 }}>{project.detail.overview}</p>

        {/* Problem / Solution / Outcome */}
        {[["Problem", project.detail.problem], ["Solution", project.detail.solution], ["Outcome", project.detail.outcome]].map(([k, v]) => (
          <div key={k} style={{ borderLeft: "3px solid #e11d48", paddingLeft: "14px" }}>
            <h4 style={{ margin: "0 0 5px", fontSize: "11px", fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.12em" }}>{k}</h4>
            <p style={{ margin: 0, color: "#475569", fontSize: "13px", lineHeight: 1.7 }}>{v}</p>
          </div>
        ))}

        {/* Technologies */}
        <div>
          <h4 style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.12em" }}>Technologies</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.detail.technologies.map((t) => (
              <span key={t} style={{ fontSize: "11px", fontWeight: 600, background: "#0f172a", color: "white", padding: "4px 12px", borderRadius: "6px" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          style={{ marginTop: "4px", padding: "11px", background: "#f1f5f9", color: "#0f172a", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}
        >
          Close
        </button>
      </div>
    </MockModal>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, onView }) {
  return (
    <div
      style={{ background: "white", borderRadius: "14px", border: "1px solid #e2e8f0", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "box-shadow 0.2s, transform 0.2s" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* Visual */}
      <div style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)", height: "130px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", position: "relative" }}>
        {ICON_MAP[project.category] || "🔬"}
        <div style={{ position: "absolute", top: "12px", left: "12px" }}>
          <StatusBadge status={project.status} />
        </div>
        <span style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(255,255,255,0.1)", color: "white", fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.2)" }}>
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#0f172a", lineHeight: 1.25 }}>{project.title}</h3>
        <p style={{ margin: 0, fontSize: "13px", color: "#64748b", lineHeight: 1.6 }}>{project.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {project.tags.map((t) => (
            <span key={t} style={{ fontSize: "10px", color: "#475569", background: "#f1f5f9", padding: "2px 7px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>{t}</span>
          ))}
        </div>
        <button
          onClick={() => onView(project)}
          style={{ marginTop: "auto", padding: "10px", background: "#0f172a", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
          onMouseEnter={(e) => (e.target.style.background = "#e11d48")}
          onMouseLeave={(e) => (e.target.style.background = "#0f172a")}
        >
          View Project
        </button>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const featured = projects.find((p) => p.featured);

  const filtered = projects.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>

      {/* ── HERO ── */}
      <section style={{ ...gridBg, background: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40px", left: "-40px", width: "200px", height: "200px", borderRadius: "50%", border: "20px solid rgba(225,29,72,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "260px", height: "260px", borderRadius: "50%", border: "20px solid rgba(15,23,42,0.05)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
          <p style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e11d48", margin: "0 0 14px" }}>
            PROJECT ARCHIVE // STEMSAGE
          </p>
          <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#0f172a", margin: "0 0 8px" }}>
            Ideas Into <span style={{ color: "#e11d48" }}>Reality.</span>
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "16px 0" }}>
            <span style={{ height: "1px", width: "40px", background: "#e11d48", display: "block" }} />
            <span style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#e11d48", display: "block" }} />
            <span style={{ height: "1px", width: "40px", background: "#e11d48", display: "block" }} />
          </div>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "#475569", maxWidth: "580px", lineHeight: 1.75, margin: "0 0 36px" }}>
            Explore prototypes, engineering solutions, and technology projects developed through the STEMSAGE ecosystem.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            <a href="#project-archive" style={{ display: "inline-block", padding: "12px 28px", background: "#e11d48", color: "white", fontWeight: 700, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "9999px", textDecoration: "none" }}>
              Explore Projects
            </a>
            <Link to="/student-projects" style={{ display: "inline-block", padding: "12px 28px", background: "white", color: "#0f172a", fontWeight: 700, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "9999px", textDecoration: "none", border: "2px solid #e2e8f0" }}>
              Student Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECT ── */}
      {featured && (
        <section style={{ background: "#0f172a", padding: "72px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", border: "20px solid rgba(225,29,72,0.07)", pointerEvents: "none" }} />

          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
            <p style={{ fontFamily: "monospace", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e11d48", margin: "0 0 32px" }}>
              Featured Project
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "48px", alignItems: "center" }}>
              {/* Left: info */}
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
                  <StatusBadge status={featured.status} />
                  <span style={{ fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "9999px", background: "rgba(255,255,255,0.08)", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", border: "1px solid rgba(255,255,255,0.12)" }}>
                    {featured.category}
                  </span>
                </div>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 16px" }}>
                  {featured.title}
                </h2>
                <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: 1.75, margin: "0 0 24px" }}>{featured.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "28px" }}>
                  {featured.tags.map((t) => (
                    <span key={t} style={{ fontSize: "11px", fontWeight: 600, background: "rgba(255,255,255,0.08)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.12)", padding: "3px 10px", borderRadius: "6px" }}>{t}</span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedProject(featured)}
                  style={{ padding: "12px 28px", background: "#e11d48", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
                >
                  View Project
                </button>
              </div>

              {/* Right: visual */}
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "18px", height: "280px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "90px" }}>
                {ICON_MAP[featured.category] || "🔬"}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── PROJECT PROCESS ── */}
      <section style={{ ...gridBg, background: "#f8fafc", padding: "72px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e11d48", margin: "0 0 14px" }}>
              From Concept to Deployment
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em", margin: 0 }}>
              How Projects Are Built
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {[
              { step: "01", title: "Concept", icon: "💡", desc: "Problem identification and initial idea definition." },
              { step: "02", title: "Prototype", icon: "🔧", desc: "Build and test the first working version." },
              { step: "03", title: "Iterate", icon: "🔄", desc: "Improve based on testing results and feedback." },
              { step: "04", title: "Deploy", icon: "🚀", desc: "Move the validated solution toward real-world use." },
            ].map((item, idx, arr) => (
              <div key={item.step} style={{ background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "28px 20px", position: "relative" }}>
                {/* Connector arrow */}
                {idx < arr.length - 1 && (
                  <div style={{ position: "absolute", right: "-14px", top: "50%", transform: "translateY(-50%)", zIndex: 2, fontSize: "18px", color: "#e2e8f0", display: "none" }}>→</div>
                )}
                <div style={{ width: "28px", height: "3px", background: "#e11d48", borderRadius: "2px", marginBottom: "16px" }} />
                <span style={{ fontFamily: "monospace", fontSize: "10px", fontWeight: 700, color: "#e11d48", letterSpacing: "0.15em", display: "block", marginBottom: "8px" }}>{item.step}</span>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{item.icon}</div>
                <h3 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: "13px", color: "#64748b", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT ARCHIVE ── */}
      <section id="project-archive" style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 900, color: "#0f172a" }}>All Projects</h2>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "10px 18px", border: "2px solid #e2e8f0", borderRadius: "9999px", fontSize: "13px", outline: "none", color: "#0f172a", minWidth: "200px" }}
          />
        </div>

        <FilterBar categories={projectCategories} active={activeCategory} onChange={setActiveCategory} />

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8", fontSize: "15px" }}>
            No projects found matching your filters.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
            {filtered.map((p) => <ProjectCard key={p.id} project={p} onView={setSelectedProject} />)}
          </div>
        )}
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: "#0f172a", padding: "80px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", margin: "0 0 16px" }}>
            Have an Idea Worth <span style={{ color: "#e11d48" }}>Building?</span>
          </h2>
          <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: 1.75, margin: "0 0 36px" }}>
            Explore the STEMSAGE ecosystem and discover how ideas become working prototypes.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
            <Link
              to="/student-projects"
              style={{ display: "inline-block", padding: "13px 28px", background: "#e11d48", color: "white", fontWeight: 700, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "9999px", textDecoration: "none" }}
            >
              Explore Student Projects
            </Link>
            <Link
              to="/services"
              style={{ display: "inline-block", padding: "13px 28px", background: "transparent", color: "white", fontWeight: 700, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "9999px", textDecoration: "none", border: "2px solid rgba(255,255,255,0.25)" }}
            >
              Contact STEMSAGE
            </Link>
          </div>
        </div>
      </section>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <Footer />
    </div>
  );
}

export default Projects;
