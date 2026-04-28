import { useState } from "react";
import { ZONES, OUTBREAKS } from "../data/mockData";

export default function Alerts() {
  const [alerts, setAlerts] = useState(
    OUTBREAKS.map((o, i) => ({ ...o, id: i, read: false }))
  );

  const markAllRead = () => setAlerts((p) => p.map((a) => ({ ...a, read: true })));
  const markRead = (id) => setAlerts((p) => p.map((a) => (a.id === id ? { ...a, read: true } : a)));

  return (
    <main style={{ padding: "20px 24px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#f8fafc" }}>🚨 Active Outbreak Alerts</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>
            Predicted 3–5 days before hospital reporting · Mumbai Region
          </div>
        </div>
        <button
          onClick={markAllRead}
          style={{
            background: "#1e293b", color: "#94a3b8", border: "1px solid #334155",
            borderRadius: 7, padding: "8px 16px", fontSize: 12, fontFamily: "inherit", cursor: "pointer",
          }}
        >
          Mark all read
        </button>
      </div>

      {alerts.map((alert) => {
        const zone = ZONES.find((z) => z.id === alert.zone);
        const isCritical = alert.severity === "CRITICAL";
        return (
          <div
            key={alert.id}
            onClick={() => markRead(alert.id)}
            style={{
              padding: "14px 16px 14px 20px",
              borderRadius: 10,
              marginBottom: 10,
              border: `1px solid ${isCritical ? "#7f1d1d" : "#78350f"}`,
              background: isCritical ? "#1c0f0f" : "#1c1209",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <div style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
              background: isCritical ? "#ef4444" : "#f97316",
            }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: isCritical ? "#ef4444" : "#f97316" }}>
                    {isCritical ? "🔴" : "🟠"} {alert.disease}
                  </span>
                  <span style={{
                    fontSize: 9, padding: "2px 8px", borderRadius: 6, fontWeight: 700,
                    background: isCritical ? "#450a0a" : "#431407",
                    color: isCritical ? "#ef4444" : "#f97316",
                  }}>
                    {alert.severity}
                  </span>
                  {!alert.read && (
                    <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 6, background: "#1e3a5f", color: "#60a5fa", fontWeight: 700 }}>
                      NEW
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>
                  📍 {zone?.name} · Spike: {alert.spike}× baseline · Detected {alert.days}d ago
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#475569" }}>#{alert.id + 1001}</div>
            </div>

            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>{alert.advice}</div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              {alert.meds.map((m) => (
                <span key={m} style={{ padding: "2px 10px", borderRadius: 6, background: "#0f172a", border: "1px solid #334155", fontSize: 10, color: "#94a3b8" }}>
                  📈 {m}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {["📧 Notify Officials", "📱 Resident Alert", "📋 View Report"].map((btn) => (
                <button
                  key={btn}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: "#0f172a", border: "1px solid #334155", borderRadius: 6,
                    padding: "5px 12px", fontSize: 10, color: "#94a3b8", cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {/* Stats */}
      <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "16px 20px", marginTop: 8 }}>
        <div style={{ fontSize: 10, color: "#475569", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 16 }}>
          ALERT STATISTICS · LAST 30 DAYS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[["12","Total Alerts","#3b82f6"],["3","Critical","#ef4444"],["5","Confirmed Outbreaks","#f97316"],["4.2","Avg Days Early","#22c55e"]].map(([v, l, c]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: c }}>{v}</div>
              <div style={{ fontSize: 10, color: "#64748b", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
