const statusStyles = {
  "OPEN": { bg: "#dcfce7", color: "#166534", border: "#bbf7d0" },
  "LIMITED SEATS": { bg: "#fef9c3", color: "#854d0e", border: "#fde68a" },
  "FULL": { bg: "#fee2e2", color: "#991b1b", border: "#fecaca" },
  "UPCOMING": { bg: "#eff6ff", color: "#1e40af", border: "#bfdbfe" },
  "COMPLETED": { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0" },
  "FIELD DEPLOYED": { bg: "#ecfdf5", color: "#065f46", border: "#6ee7b7" },
  "PROTOTYPE": { bg: "#faf5ff", color: "#6b21a8", border: "#e9d5ff" },
  "RESEARCH": { bg: "#fff7ed", color: "#9a3412", border: "#fed7aa" },
  "In Stock": { bg: "#f0fdf4", color: "#166534", border: "#bbf7d0" },
  "Limited Stock": { bg: "#fef9c3", color: "#854d0e", border: "#fde68a" },
  "Out of Stock": { bg: "#fee2e2", color: "#991b1b", border: "#fecaca" },
};

function StatusBadge({ status }) {
  const style = statusStyles[status] || { bg: "#f1f5f9", color: "#475569", border: "#e2e8f0" };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "9999px",
        background: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
