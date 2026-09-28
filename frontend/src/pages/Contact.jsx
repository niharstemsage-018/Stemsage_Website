import { useState } from "react";
import Footer from "../components/common/Footer";

const gridBg = {
  backgroundImage:
    "linear-gradient(to right, rgba(226,232,240,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,232,240,0.6) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

const contactDetails = [
  {
    icon: "✉️",
    label: "Email Us",
    value: "stemsage.techworld.llp@gmail.com",
    href: "mailto:stemsage.techworld.llp@gmail.com",
    sub: "We typically reply within 24 hours",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Pune, Maharashtra, India",
    href: null,
    sub: "STEMSAGE Techworld LLP",
  },
  {
    icon: "🕐",
    label: "Working Hours",
    value: "Mon – Sat, 9 AM – 6 PM",
    href: null,
    sub: "IST (Indian Standard Time)",
  },
];

const SUBJECTS = [
  "General Enquiry",
  "Courses & Learning",
  "Workshops",
  "Projects",
  "Our Store",
  "Partnership / Collaboration",
  "Other",
];

const INITIAL_FORM = { name: "", email: "", phone: "", subject: "", message: "" };
const ERRORS_INIT = {};

function validate(form) {
  const errs = {};
  if (!form.name.trim()) errs.name = "Name is required.";
  if (!form.email.trim()) errs.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address.";
  if (!form.subject) errs.subject = "Please select a subject.";
  if (!form.message.trim()) errs.message = "Message cannot be empty.";
  else if (form.message.trim().length < 20) errs.message = "Message must be at least 20 characters.";
  return errs;
}

function InputField({ label, id, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label htmlFor={id} style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569" }}>
        {label}
      </label>
      {children}
      {error && <span style={{ fontSize: "11px", color: "#e11d48", fontWeight: 600 }}>{error}</span>}
    </div>
  );
}

const inputStyle = (hasError) => ({
  padding: "11px 14px",
  border: `2px solid ${hasError ? "#fca5a5" : "#e2e8f0"}`,
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  color: "#0f172a",
  background: "white",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
});

function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(ERRORS_INIT);
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: "56px", marginBottom: "16px" }}>🎉</div>
        <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", marginBottom: "10px" }}>Message Sent!</h3>
        <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.75, maxWidth: "360px", margin: "0 auto 24px" }}>
          Thank you for reaching out. The STEMSAGE team will get back to you at <strong>{form.email}</strong> within 24 hours.
        </p>
        <button
          onClick={() => { setForm(INITIAL_FORM); setErrors(ERRORS_INIT); setSubmitted(false); }}
          style={{ padding: "11px 28px", background: "#0f172a", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
        >
          Send Another
        </button>
        <p style={{ marginTop: "12px", fontSize: "11px", color: "#94a3b8" }}>
          This is a frontend demo — no email was actually sent.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {/* Name + Email */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <InputField label="Full Name *" id="name" error={errors.name}>
          <input
            id="name" type="text" placeholder="Your name"
            value={form.name} onChange={set("name")}
            style={inputStyle(!!errors.name)}
            onFocus={(e) => (e.target.style.borderColor = "#0f172a")}
            onBlur={(e) => (e.target.style.borderColor = errors.name ? "#fca5a5" : "#e2e8f0")}
          />
        </InputField>
        <InputField label="Email Address *" id="email" error={errors.email}>
          <input
            id="email" type="email" placeholder="you@example.com"
            value={form.email} onChange={set("email")}
            style={inputStyle(!!errors.email)}
            onFocus={(e) => (e.target.style.borderColor = "#0f172a")}
            onBlur={(e) => (e.target.style.borderColor = errors.email ? "#fca5a5" : "#e2e8f0")}
          />
        </InputField>
      </div>

      {/* Phone + Subject */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <InputField label="Phone (Optional)" id="phone" error={errors.phone}>
          <input
            id="phone" type="tel" placeholder="+91 00000 00000"
            value={form.phone} onChange={set("phone")}
            style={inputStyle(false)}
            onFocus={(e) => (e.target.style.borderColor = "#0f172a")}
            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
          />
        </InputField>
        <InputField label="Subject *" id="subject" error={errors.subject}>
          <select
            id="subject"
            value={form.subject} onChange={set("subject")}
            style={{ ...inputStyle(!!errors.subject), background: "white", cursor: "pointer" }}
            onFocus={(e) => (e.target.style.borderColor = "#0f172a")}
            onBlur={(e) => (e.target.style.borderColor = errors.subject ? "#fca5a5" : "#e2e8f0")}
          >
            <option value="">Select a subject</option>
            {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </InputField>
      </div>

      {/* Message */}
      <InputField label="Message *" id="message" error={errors.message}>
        <textarea
          id="message" rows={5} placeholder="Tell us how we can help you..."
          value={form.message} onChange={set("message")}
          style={{ ...inputStyle(!!errors.message), resize: "vertical", lineHeight: 1.6 }}
          onFocus={(e) => (e.target.style.borderColor = "#0f172a")}
          onBlur={(e) => (e.target.style.borderColor = errors.message ? "#fca5a5" : "#e2e8f0")}
        />
      </InputField>

      <button
        type="submit"
        style={{ padding: "13px", background: "#e11d48", color: "white", border: "none", borderRadius: "9999px", fontWeight: 700, fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.15s" }}
        onMouseEnter={(e) => (e.target.style.background = "#be123c")}
        onMouseLeave={(e) => (e.target.style.background = "#e11d48")}
      >
        Send Message →
      </button>
      <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8", textAlign: "center" }}>
        Demo only — no real email is sent. For direct contact use the email below.
      </p>
    </form>
  );
}

function Contact() {
  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{ ...gridBg, background: "#fff", position: "relative", overflow: "hidden", padding: "80px 24px 72px" }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "-50px", left: "-50px", width: "220px", height: "220px", borderRadius: "50%", border: "20px solid rgba(225,29,72,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-70px", right: "-70px", width: "280px", height: "280px", borderRadius: "50%", border: "20px solid rgba(15,23,42,0.04)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e11d48", margin: "0 0 14px" }}>
            CONTACT US // STEMSAGE
          </p>
          <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#0f172a", margin: "0 0 8px" }}>
            Let's Start a{" "}
            <span style={{ color: "#e11d48" }}>Conversation.</span>
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "16px 0" }}>
            <span style={{ height: "1px", width: "40px", background: "#e11d48", display: "block" }} />
            <span style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#e11d48", display: "block" }} />
            <span style={{ height: "1px", width: "40px", background: "#e11d48", display: "block" }} />
          </div>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "#475569", maxWidth: "560px", lineHeight: 1.75, margin: 0 }}>
            Have a question, want to enrol in a programme, or looking to collaborate? Reach out — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ background: "#f8fafc", padding: "64px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", alignItems: "start" }}>

          {/* ── LEFT: Contact Details ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e11d48", margin: "0 0 10px" }}>
                Get In Touch
              </p>
              <h2 style={{ fontSize: "26px", fontWeight: 900, color: "#0f172a", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
                Contact Information
              </h2>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                Choose the most convenient way to reach us. We're always happy to help.
              </p>
            </div>

            {/* Detail Cards */}
            {contactDetails.map((item) => (
              <div
                key={item.label}
                style={{ background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", padding: "20px", display: "flex", alignItems: "flex-start", gap: "16px", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
              >
                <div style={{ fontSize: "26px", flexShrink: 0, marginTop: "2px" }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8", marginBottom: "4px" }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", textDecoration: "none" }}
                      onMouseEnter={(e) => (e.target.style.color = "#e11d48")}
                      onMouseLeave={(e) => (e.target.style.color = "#0f172a")}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>{item.value}</div>
                  )}
                  <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "3px" }}>{item.sub}</div>
                </div>
              </div>
            ))}

            {/* Direct Email CTA */}
            <a
              href="mailto:stemsage.techworld.llp@gmail.com?subject=Enquiry from Website"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "13px 24px", background: "#0f172a", color: "white", borderRadius: "9999px", fontWeight: 700, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e11d48")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0f172a")}
            >
              ✉️ &nbsp;Email Us Directly
            </a>
          </div>

          {/* ── RIGHT: Contact Form ── */}
          <div style={{ background: "white", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "36px", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
            <div style={{ marginBottom: "28px" }}>
              <p style={{ fontFamily: "monospace", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e11d48", margin: "0 0 8px" }}>
                Enquiry Form
              </p>
              <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>
                Send Us a Message
              </h2>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section style={{ background: "#0f172a", padding: "72px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)", backgroundSize: "50px 50px", pointerEvents: "none" }} />
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#e11d48", margin: "0 0 12px" }}>
              Quick Answers
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 900, color: "white", letterSpacing: "-0.02em", margin: 0 }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { q: "How do I enrol in a course or workshop?", a: "Browse the Courses or Workshops pages, pick a programme that suits you, and fill out the enquiry form or email us directly. Our team will get back to you with details." },
              { q: "Do you offer in-person or online sessions?", a: "We offer both. Some workshops and courses are conducted in person at our Pune location, while others are available online. Details are listed on each programme page." },
              { q: "Can schools or colleges partner with STEMSAGE?", a: "Absolutely. We actively collaborate with educational institutions to run STEM programmes. Reach out via the enquiry form and select 'Partnership / Collaboration'." },
              { q: "How long does it take to receive a reply?", a: "We aim to respond to all enquiries within 24 hours on working days (Monday–Saturday, 9 AM – 6 PM IST)." },
            ].map((faq, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "22px 24px" }}>
                <h4 style={{ margin: "0 0 10px", fontSize: "15px", fontWeight: 800, color: "white" }}>{faq.q}</h4>
                <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8", lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
