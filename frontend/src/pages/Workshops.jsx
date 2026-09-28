import { useState } from "react";
import Footer from "../components/common/Footer";
import PageHero from "../components/mock/PageHero";
import FilterBar from "../components/mock/FilterBar";
import MockModal from "../components/mock/MockModal";
import StatusBadge from "../components/mock/StatusBadge";
import { workshops, workshopCategories } from "../data/workshops";

const ICON_MAP = {
  Robotics: "🤖", Electronics: "⚡", IoT: "📡",
  Programming: "💻", "3D Design": "🖨️", AI: "🧠",
};

function WorkshopCard({ workshop, onRegister, onView }) {
  const isFull = workshop.status === "FULL";
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
        opacity: isFull ? 0.75 : 1,
      }}
      onMouseEnter={(e) => {
        if (!isFull) {
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          height: "130px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "48px",
          position: "relative",
        }}
      >
        {ICON_MAP[workshop.category] || "🔬"}
        <div style={{ position: "absolute", top: "12px", left: "12px" }}>
          <StatusBadge status={workshop.status} />
        </div>
      </div>

      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#0f172a", lineHeight: 1.25 }}>
          {workshop.title}
        </h3>
        <p style={{ margin: 0, fontSize: "13px", color: "#64748b", lineHeight: 1.6 }}>
          {workshop.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
          {[
            { icon: "📅", val: workshop.date },
            { icon: "⏱", val: workshop.duration },
            { icon: "📍", val: workshop.location },
            { icon: "🎯", val: workshop.level },
          ].map(({ icon, val }) => (
            <span key={val} style={{ fontSize: "11px", color: "#475569", background: "#f8fafc", border: "1px solid #e2e8f0", padding: "3px 8px", borderRadius: "6px" }}>
              {icon} {val}
            </span>
          ))}
        </div>

        {!isFull && (
          <p style={{ margin: 0, fontSize: "12px", color: workshop.seatsLeft <= 5 ? "#d97706" : "#475569", fontWeight: 600 }}>
            {workshop.seatsLeft} seats remaining
          </p>
        )}

        <div style={{ display: "flex", gap: "10px", marginTop: "auto", paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
          <button
            onClick={() => onView(workshop)}
            style={{
              flex: 1,
              padding: "9px",
              background: "white",
              color: "#0f172a",
              border: "2px solid #e2e8f0",
              borderRadius: "9999px",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            View Details
          </button>
          <button
            onClick={() => !isFull && onRegister(workshop)}
            disabled={isFull}
            style={{
              flex: 1,
              padding: "9px",
              background: isFull ? "#e2e8f0" : "#e11d48",
              color: isFull ? "#94a3b8" : "white",
              border: "none",
              borderRadius: "9999px",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: isFull ? "not-allowed" : "pointer",
            }}
          >
            {isFull ? "Full" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

function RegistrationModal({ workshop, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <MockModal isOpen={!!workshop} onClose={() => { onClose(); setSubmitted(false); setForm({ name: "", email: "", phone: "" }); }} title="Workshop Registration">
      {submitted ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
          <h4 style={{ color: "#0f172a", fontWeight: 800, marginBottom: "8px" }}>Interest Recorded!</h4>
          <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.7 }}>
            Thanks! Your interest has been recorded for <strong>{workshop?.title}</strong>.<br />
            This is a demo — no data was actually submitted.
          </p>
          <button
            onClick={() => { onClose(); setSubmitted(false); }}
            style={{ marginTop: "20px", padding: "10px 24px", background: "#0f172a", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
            Registering for: <strong style={{ color: "#0f172a" }}>{workshop?.title}</strong>
          </p>
          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: "6px" }}>
                {field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Phone Number"}
              </label>
              <input
                required
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", border: "2px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", outline: "none", color: "#0f172a", boxSizing: "border-box" }}
              />
            </div>
          ))}
          <button
            type="submit"
            style={{ padding: "12px", background: "#e11d48", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", marginTop: "6px" }}
          >
            Submit Interest
          </button>
          <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8", textAlign: "center" }}>
            Demo only — no data is submitted
          </p>
        </form>
      )}
    </MockModal>
  );
}

function WorkshopDetailModal({ workshop, onClose, onRegister }) {
  if (!workshop) return null;
  return (
    <MockModal isOpen={!!workshop} onClose={onClose} title={workshop.title}>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <StatusBadge status={workshop.status} />
        <p style={{ margin: 0, color: "#475569", fontSize: "14px", lineHeight: 1.7 }}>{workshop.description}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {[
            ["Date", workshop.date],
            ["Duration", workshop.duration],
            ["Location", workshop.location],
            ["Level", workshop.level],
            ["Seats", `${workshop.seatsLeft}/${workshop.seats} available`],
            ["Schedule", workshop.detail.schedule],
          ].map(([k, v]) => (
            <div key={k} style={{ background: "#f8fafc", borderRadius: "8px", padding: "10px 14px" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{k}</div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{v}</div>
            </div>
          ))}
        </div>
        <div>
          <p style={{ margin: "0 0 6px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569" }}>Includes</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {workshop.detail.includes.map((i) => (
              <span key={i} style={{ background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", padding: "3px 10px", borderRadius: "9999px", fontSize: "11px", fontWeight: 600 }}>✓ {i}</span>
            ))}
          </div>
        </div>
        <button
          onClick={() => { onClose(); onRegister(workshop); }}
          disabled={workshop.status === "FULL"}
          style={{
            padding: "12px", background: workshop.status === "FULL" ? "#e2e8f0" : "#e11d48",
            color: workshop.status === "FULL" ? "#94a3b8" : "white",
            border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: workshop.status === "FULL" ? "not-allowed" : "pointer"
          }}
        >
          {workshop.status === "FULL" ? "Workshop Full" : "Register Interest"}
        </button>
      </div>
    </MockModal>
  );
}

function Workshops() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [registerTarget, setRegisterTarget] = useState(null);
  const [viewTarget, setViewTarget] = useState(null);

  const filtered = workshops.filter(
    (w) => activeCategory === "All" || w.category === activeCategory
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <PageHero
        label="STEMSAGE WORKSHOPS // LIVE LEARNING"
        heading="Build Something"
        headingAccent="Real."
        subtext="Short-format workshops designed around experimentation, collaboration, and making."
      />

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 900, color: "#0f172a" }}>Upcoming Workshops</h2>
        </div>
        <FilterBar categories={workshopCategories} active={activeCategory} onChange={setActiveCategory} />
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>No workshops in this category right now.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
            {filtered.map((w) => (
              <WorkshopCard key={w.id} workshop={w} onRegister={setRegisterTarget} onView={setViewTarget} />
            ))}
          </div>
        )}
      </section>

      <RegistrationModal workshop={registerTarget} onClose={() => setRegisterTarget(null)} />
      <WorkshopDetailModal workshop={viewTarget} onClose={() => setViewTarget(null)} onRegister={setRegisterTarget} />
      <Footer />
    </div>
  );
}

export default Workshops;
