import { useState } from "react";
import Footer from "../components/common/Footer";
import Modal from "../components/mock/Modal";
import { studentProjects, studentProjectCategories } from "../data/studentProjects";
import heroBgImg from "../assets/student_hero_bg.jpg";

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
    <Modal isOpen={isOpen} onClose={handleClose} title="Submit Your Project">
      {submitted ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
          <h4 style={{ color: "#0f172a", fontWeight: 800, marginBottom: "8px" }}>Project Submitted!</h4>
          <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.7 }}>
            Thanks for sharing your project! Your submission has been received.
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
        </form>
      )}
    </Modal>
  );
}

function StudentProjects() {
  const [submitOpen, setSubmitOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between font-sans">
      {/* Top Banner Notice */}
      <div className="bg-black text-white text-center py-2.5 px-4 text-xs font-medium tracking-wide">
        Welcome to STEMSAGE (For the best experience, please view this site on a desktop)
      </div>

      <main className="flex-grow">
        {/* Hero Section with Sand Dune Background & Overlapping White Box */}
        <section
          className="relative bg-cover bg-center py-16 sm:py-24 px-4 sm:px-6"
          style={{ backgroundImage: `url(${heroBgImg})` }}
        >
          {/* Centered White Card Box */}
          <div className="relative max-w-3xl mx-auto bg-white p-8 sm:p-14 shadow-sm text-center border border-slate-100/80">
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-slate-900 mb-6 font-sans">
              Student Projects
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              This is your Project Page. It's a great opportunity to help visitors understand the context and background of your latest work. Double click on the text box to start editing your content and make sure to add all the relevant details you want to share.
            </p>
          </div>
        </section>

        {/* Horizontal Line below Hero Card */}
        <div className="max-w-4xl mx-auto px-6 mt-12 mb-16">
          <hr className="border-t border-slate-700/60 w-full" />
        </div>

        {/* Student Projects Alternating List */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="space-y-16 sm:space-y-20">
            {studentProjects.map((project, idx) => {
              const isImageLeft = idx % 2 === 0;

              return (
                <div key={project.id || idx}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
                    {/* Image Column */}
                    <div className={`overflow-hidden ${isImageLeft ? "md:order-1" : "md:order-2"}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 sm:h-72 object-cover rounded-none"
                      />
                    </div>

                    {/* Text Column */}
                    <div className={`flex flex-col justify-center space-y-3 ${isImageLeft ? "md:order-2" : "md:order-1"}`}>
                      <span className="text-2xl sm:text-3xl font-light text-slate-800 tracking-wider">
                        {project.numStr}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight">
                        {project.title}
                      </h2>
                      {project.subtitle && (
                        <p className="text-xs font-semibold text-red-600 tracking-wide">
                          {project.subtitle} — {project.studentName}
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Red Divider Line between projects */}
                  {idx < studentProjects.length - 1 && (
                    <hr className="mt-16 sm:mt-20 border-t border-red-500/90 w-full" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Project Action Banner */}
          <div className="mt-20 text-center pt-10 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setSubmitOpen(true)}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-wider transition hover:bg-red-700 shadow-sm cursor-pointer"
            >
              + Submit Your Project
            </button>
          </div>
        </section>
      </main>

      <SubmitModal isOpen={submitOpen} onClose={() => setSubmitOpen(false)} />
      <Footer />
    </div>
  );
}

export default StudentProjects;
