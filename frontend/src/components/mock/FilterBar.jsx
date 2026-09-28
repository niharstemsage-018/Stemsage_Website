function FilterBar({ categories, active, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        marginBottom: "32px",
      }}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          style={{
            padding: "7px 18px",
            borderRadius: "9999px",
            border: active === cat ? "2px solid #e11d48" : "2px solid #e2e8f0",
            background: active === cat ? "#e11d48" : "white",
            color: active === cat ? "white" : "#475569",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
