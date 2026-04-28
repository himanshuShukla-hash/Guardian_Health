import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Alerts from "./pages/Alerts";
import AIInsights from "./pages/AIInsights";
import { OUTBREAKS } from "./data/mockData";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [liveTime, setLiveTime] = useState(new Date());
  const [animIn, setAnimIn] = useState(false);
  const unreadCount = OUTBREAKS.length;

  useEffect(() => {
    const t = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setTimeout(() => setAnimIn(true), 80);
  }, []);

  const tabs = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "inventory", label: "🏪 Inventory" },
    { id: "alerts",    label: "🚨 Alerts",    badge: unreadCount },
    { id: "ai",        label: "🤖 AI Insights" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020817",
      color: "#e2e8f0",
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      opacity: animIn ? 1 : 0,
      transform: animIn ? "translateY(0)" : "translateY(12px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
    }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
        @keyframes spin  { to{transform:rotate(360deg)} }
        ::-webkit-scrollbar { width:4px; height:4px }
        ::-webkit-scrollbar-track { background:#0f172a }
        ::-webkit-scrollbar-thumb { background:#334155; border-radius:4px }
        button:hover { filter:brightness(1.12) }
        * { box-sizing: border-box }
      `}</style>

      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
        borderBottom: "1px solid #1e293b",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 38, height: 38,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20,
            boxShadow: "0 0 20px rgba(59,130,246,0.4)",
          }}>
            🛡️
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#f8fafc", letterSpacing: "-0.5px" }}>Guardian Health</div>
            <div style={{ fontSize: 10, color: "#64748b", letterSpacing: "2px", textTransform: "uppercase" }}>
              Disease Outbreak Early Warning System
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{
          display: "flex", gap: 4,
          background: "#0f172a",
          padding: "4px",
          borderRadius: 10,
          border: "1px solid #1e293b",
        }}>
          {tabs.map(({ id, label, badge }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                padding: "7px 16px",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "inherit",
                letterSpacing: "0.5px",
                transition: "all 0.2s",
                background: activeTab === id ? "linear-gradient(135deg,#3b82f6,#6366f1)" : "transparent",
                color: activeTab === id ? "#fff" : "#64748b",
                boxShadow: activeTab === id ? "0 2px 12px rgba(99,102,241,0.4)" : "none",
              }}
            >
              {label}
              {badge > 0 && (
                <span style={{ marginLeft: 6, background: "#ef4444", borderRadius: 10, padding: "1px 6px", fontSize: 10 }}>
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Live clock */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#64748b" }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 8px #22c55e",
            animation: "pulse 2s infinite",
          }} />
          <div>
            <div style={{ color: "#94a3b8", fontSize: 12 }}>
              LIVE · {liveTime.toLocaleTimeString()}
            </div>
            <div style={{ fontSize: 10, color: "#475569" }}>Mumbai Metropolitan · 8 Zones</div>
          </div>
        </div>
      </header>

      {/* Page content */}
      {activeTab === "dashboard" && <Dashboard />}
      {activeTab === "inventory" && <Inventory />}
      {activeTab === "alerts"    && <Alerts />}
      {activeTab === "ai"        && <AIInsights />}
    </div>
  );
}
