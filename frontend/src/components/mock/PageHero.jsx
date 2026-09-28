function PageHero({ label, heading, headingAccent, subtext, cta }) {
  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(226,232,240,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,232,240,0.6) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      {/* Decorative circles */}
      <div
        className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full border-[20px] border-red-500/10"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full border-[20px] border-slate-200/60"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10">
        {/* Label */}
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#e11d48",
            marginBottom: "20px",
          }}
        >
          {label}
        </p>

        {/* Heading */}
        <h1
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#0f172a",
            marginBottom: "20px",
          }}
        >
          {heading}
          {headingAccent && (
            <span style={{ color: "#e11d48" }}> {headingAccent}</span>
          )}
        </h1>

        {/* Red divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ height: "1px", width: "40px", background: "#e11d48", display: "block" }} />
          <span style={{ height: "10px", width: "10px", borderRadius: "50%", background: "#e11d48", display: "block" }} />
          <span style={{ height: "1px", width: "40px", background: "#e11d48", display: "block" }} />
        </div>

        {/* Subtext */}
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: "#475569",
            maxWidth: "560px",
            lineHeight: 1.7,
            marginBottom: cta ? "32px" : "0",
          }}
        >
          {subtext}
        </p>

        {/* Optional CTA */}
        {cta && (
          <a
            href={cta.href || "#"}
            style={{
              display: "inline-block",
              padding: "12px 28px",
              background: "#e11d48",
              color: "white",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#be123c")}
            onMouseLeave={(e) => (e.target.style.background = "#e11d48")}
          >
            {cta.label}
          </a>
        )}
      </div>
    </section>
  );
}

export default PageHero;
