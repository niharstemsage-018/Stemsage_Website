import { useState } from "react";
import Footer from "../components/common/Footer";
import PageHero from "../components/mock/PageHero";
import FilterBar from "../components/mock/FilterBar";
import MockModal from "../components/mock/MockModal";
import { studentProjects, studentProjectCategories } from "../data/studentProjects";

const ICON_MAP = {
  Robotics: "🤖", IoT: "📡", Electronics: "⚡",
  Programming: "💻", "AI/ML": "🧠", "3D Design": "🖨️",
};

function StudentProjectCard({ project, onView }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)", height: "120px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "44px", position: "relative" }}>
        {ICON_MAP[project.category] || "🔬"}
        <span style={{ position: "absolute", top: "10px", right: "10px", fontSize: "10px", fontWeight: 700, background: "rgba(225,29,72,0.85)", color: "white", padding: "2px 8px", borderRadius: "6px", letterSpacing: "0.06em" }}>
          {project.category}
        </span>
      </div>

      <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #e11d48, #0f172a)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "13px", flexShrink: 0 }}>
            {project.studentName.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "12px", color: "#0f172a" }}>{project.studentName}</div>
            <div style={{ fontSize: "10px", color: "#94a3b8" }}>{project.institution}</div>
          </div>
        </div>

        <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 800, color: "#0f172a", lineHeight: 1.25 }}>{project.title}</h3>
        <p style={{ margin: 0, fontSize: "12px", color: "#64748b", lineHeight: 1.6 }}>{project.description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {project.tags.map((t) => (
            <span key={t} style={{ fontSize: "10px", color: "#475569", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>{t}</span>
          ))}
        </div>

        <button
          onClick={() => onView(project)}
          style={{ marginTop: "auto", padding: "9px", background: "#0f172a", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.15s" }}
          onMouseEnter={(e) => (e.target.style.background = "#e11d48")}
          onMouseLeave={(e) => (e.target.style.background = "#0f172a")}
        >
          View Project
        </button>
      </div>
    </div>
  );
}

function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;
  return (
    <MockModal isOpen={!!project} onClose={onClose} title={project.title}>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "#f8fafc", borderRadius: "10px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #e11d48, #0f172a)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "16px" }}>
            {project.studentName.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 800, color: "#0f172a", fontSize: "14px" }}>{project.studentName}</div>
            <div style={{ color: "#94a3b8", fontSize: "12px" }}>{project.institution}</div>
          </div>
          <span style={{ marginLeft: "auto", fontSize: "10px", fontWeight: 700, background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", padding: "3px 10px", borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {project.category}
          </span>
        </div>
        <p style={{ margin: 0, color: "#475569", fontSize: "14px", lineHeight: 1.7 }}>{project.description}</p>
        <div>
          <p style={{ margin: "0 0 8px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569" }}>Technologies Used</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.tags.map((t) => <span key={t} style={{ fontSize: "11px", fontWeight: 600, background: "#0f172a", color: "white", padding: "3px 10px", borderRadius: "6px" }}>{t}</span>)}
          </div>
        </div>
      </div>
    </MockModal>
  );
}

function SubmitModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", title: "", institution: "", category: "", description: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({ name: "", title: "", institution: "", category: "", description: "" });
    onClose();
  };

  return (
    <MockModal isOpen={isOpen} onClose={handleClose} title="Submit Your Project">
      {submitted ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
          <h4 style={{ color: "#0f172a", fontWeight: 800, marginBottom: "8px" }}>Project Submitted!</h4>
          <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.7 }}>
            Thanks for sharing your project! This is a demo — no data was actually saved.
          </p>
          <button
            onClick={handleClose}
            style={{ marginTop: "20px", padding: "10px 24px", background: "#0f172a", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {[
            { key: "name", label: "Student Name", type: "text" },
            { key: "title", label: "Project Title", type: "text" },
            { key: "institution", label: "School / Institution", type: "text" },
          ].map(({ key, label, type }) => (
            <div key={key}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: "6px" }}>{label}</label>
              <input
                required
                type={type}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", border: "2px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", color: "#0f172a", boxSizing: "border-box" }}
              />
            </div>
          ))}
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: "6px" }}>Category</label>
            <select
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{ width: "100%", padding: "10px 14px", border: "2px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", color: "#0f172a", boxSizing: "border-box", background: "white" }}
            >
              <option value="">Select a category</option>
              {studentProjectCategories.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: "6px" }}>Project Description</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ width: "100%", padding: "10px 14px", border: "2px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", color: "#0f172a", boxSizing: "border-box", resize: "vertical" }}
            />
          </div>
          <button
            type="submit"
            style={{ padding: "12px", background: "#e11d48", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}
          >
            Submit Project
          </button>
          <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8", textAlign: "center" }}>Demo only — no data is submitted</p>
        </form>
      )}
    </MockModal>
  );
}

function StudentProjects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [submitOpen, setSubmitOpen] = useState(false);

  const spotlight = studentProjects.find((p) => p.spotlight);
  const filtered = studentProjects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <PageHero
        label="STUDENT PROJECTS // SHOWCASE"
        heading="Built by the"
        headingAccent="Next Generation."
        subtext="Explore ideas, experiments, and prototypes created by STEMSAGE students."
      />

      {/* Student Spotlight */}
      {spotlight && (
        <section style={{ background: "#0f172a", padding: "60px 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontFamily: "monospace", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e11d48", marginBottom: "20px" }}>
              Student Spotlight
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg, #e11d48, #be123c)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 900, fontSize: "20px" }}>
                    {spotlight.studentName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ color: "white", fontWeight: 800, fontSize: "16px" }}>{spotlight.studentName}</div>
                    <div style={{ color: "#94a3b8", fontSize: "12px" }}>{spotlight.institution}</div>
                  </div>
                </div>
                <h2 style={{ margin: "0 0 16px", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 900, color: "white", lineHeight: 1.15, letterSpacing: "-0.02em" }}>{spotlight.title}</h2>
                <p style={{ margin: "0 0 20px", color: "#94a3b8", fontSize: "14px", lineHeight: 1.7 }}>{spotlight.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
                  {spotlight.tags.map((t) => <span key={t} style={{ fontSize: "11px", fontWeight: 600, background: "rgba(255,255,255,0.08)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.12)", padding: "3px 10px", borderRadius: "6px" }}>{t}</span>)}
                </div>
                <button
                  onClick={() => setSelectedProject(spotlight)}
                  style={{ padding: "12px 28px", background: "#e11d48", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
                >
                  View Project
                </button>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", height: "240px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "72px" }}>
                {ICON_MAP[spotlight.category] || "🔬"}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 900, color: "#0f172a" }}>All Student Projects</h2>
          <button
            onClick={() => setSubmitOpen(true)}
            style={{ padding: "11px 24px", background: "#e11d48", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}
          >
            + Submit Your Project
          </button>
        </div>

        <FilterBar categories={studentProjectCategories} active={activeCategory} onChange={setActiveCategory} />

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>No projects in this category.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {filtered.map((p) => <StudentProjectCard key={p.id} project={p} onView={setSelectedProject} />)}
          </div>
        )}
      </section>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <SubmitModal isOpen={submitOpen} onClose={() => setSubmitOpen(false)} />
      <Footer />
    </div>
  );
}

export default StudentProjects;
