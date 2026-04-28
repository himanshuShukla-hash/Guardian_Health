export function riskColor(r) {
  if (r >= 80) return "#ef4444";
  if (r >= 50) return "#f97316";
  if (r >= 25) return "#eab308";
  return "#22c55e";
}

export function riskBg(r) {
  if (r >= 80) return "#450a0a";
  if (r >= 50) return "#431407";
  if (r >= 25) return "#422006";
  return "#052e16";
}

export function riskLabel(r) {
  if (r >= 80) return "CRITICAL";
  if (r >= 50) return "HIGH";
  if (r >= 25) return "MEDIUM";
  return "LOW";
}

export const s = {
  main: { padding: "20px 24px", maxWidth: 1400, margin: "0 auto" },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 },
  card: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: "16px 20px",
  },
  cardTitle: {
    fontSize: 10,
    color: "#475569",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  statNum: { fontSize: 32, fontWeight: 700, color: "#f8fafc", lineHeight: 1.1 },
  statSub: { fontSize: 11, color: "#64748b", marginTop: 4 },
  riskBadge: (r) => ({
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 6,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "1.5px",
    background: riskBg(r),
    color: riskColor(r),
    border: `1px solid ${riskColor(r)}44`,
  }),
  mapCard: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 12,
    overflow: "hidden",
  },
  mapHeader: {
    padding: "14px 18px",
    borderBottom: "1px solid #1e293b",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  zonePanel: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  zoneItem: (active) => ({
    padding: "10px 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    borderLeft: active ? "3px solid #3b82f6" : "3px solid transparent",
    background: active ? "#1e293b44" : "transparent",
    transition: "all 0.15s",
  }),
  input: {
    background: "#020817",
    border: "1px solid #334155",
    borderRadius: 7,
    color: "#e2e8f0",
    padding: "8px 12px",
    fontSize: 12,
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  select: {
    background: "#020817",
    border: "1px solid #334155",
    borderRadius: 7,
    color: "#e2e8f0",
    padding: "8px 12px",
    fontSize: 12,
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
};
