import { useState } from "react";
import Sparkline from "../components/Sparkline";
import { ZONES, OUTBREAKS, TREND_DATA, ZONE_RISK } from "../data/mockData";
import { runGeminiAnalysis } from "../utils/gemini";
import { riskLabel, riskColor, riskBg, s } from "../utils/styles";

export default function AIInsights() {
  const [selectedZone, setSelectedZone] = useState("z1");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [queried, setQueried] = useState(false);

  const zone = ZONES.find((z) => z.id === selectedZone);
  const risk = ZONE_RISK[selectedZone] || 10;
  const trend = TREND_DATA[selectedZone] || [];
  const outbreak = OUTBREAKS.find((o) => o.zone === selectedZone);

  const peakVal = Math.max(...trend);
  const minVal = Math.min(...trend);
  const spikeRatio = (peakVal / (minVal || 1)).toFixed(1);

  const handleAnalyze = async () => {
    setLoading(true);
    setQueried(true);
    const meds = outbreak ? outbreak.meds : [];
    const text = await runGeminiAnalysis(zone.name, zone.pop, trend, meds, spikeRatio, risk);
    setResult(text);
    setLoading(false);
  };

  return (
    <main style={s.main}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#f8fafc" }}>🤖 AI Epidemiology Engine</div>
        <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>
          Powered by Google Gemini · Analyzes sales anomalies to predict outbreak patterns
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
        {/* Zone selector */}
        <div style={s.card}>
          <div style={s.cardTitle}>SELECT ZONE TO ANALYZE</div>
          {ZONES.map((z) => {
            const r = ZONE_RISK[z.id] || 10;
            return (
              <div
                key={z.id}
                onClick={() => { setSelectedZone(z.id); setQueried(false); setResult(""); }}
                style={{
                  ...s.zoneItem(selectedZone === z.id),
                  marginBottom: 4,
                  borderRadius: 8,
                  border: `1px solid ${selectedZone === z.id ? "#3b82f644" : "#1e293b"}`,
                }}
              >
                <div style={{ fontSize: 12, color: "#e2e8f0" }}>{z.name}</div>
                <span style={s.riskBadge(r)}>{riskLabel(r)}</span>
              </div>
            );
          })}
        </div>

        {/* Analysis panel */}
        <div style={{
          background: "#0f172a",
          border: "1px solid #312e81",
          borderRadius: 12,
          padding: "20px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Top accent */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#f8fafc" }}>🔬 Outbreak Prediction Analysis</div>
              <div style={{ fontSize: 11, color: "#6366f1", marginTop: 4, display: "flex", alignItems: "center", gap: 8 }}>
                Zone: {zone?.name} · Risk: {risk}/100 · <span style={s.riskBadge(risk)}>{riskLabel(risk)}</span>
              </div>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 24px",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "inherit",
                cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "1px",
                boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "⏳ Analyzing..." : "▶ RUN ANALYSIS"}
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[
              { label: "14-DAY PEAK",  value: `${peakVal}`,      unit: "units sold" },
              { label: "SPIKE RATIO",  value: `${spikeRatio}×`,  unit: "vs baseline" },
              { label: "RISK SCORE",   value: `${risk}%`,         unit: "outbreak prob" },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "#020817", borderRadius: 8, padding: "10px 14px", border: "1px solid #1e293b" }}>
                <div style={{ fontSize: 9, color: "#475569", letterSpacing: "1.5px" }}>{stat.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#818cf8", margin: "4px 0" }}>{stat.value}</div>
                <div style={{ fontSize: 10, color: "#64748b" }}>{stat.unit}</div>
              </div>
            ))}
          </div>

          {/* Trend chart */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 9, color: "#475569", letterSpacing: "1.5px", marginBottom: 6 }}>
              14-DAY SALES TREND · {zone?.name?.toUpperCase()}
            </div>
            <Sparkline data={trend} color={riskColor(risk)} width={500} height={60} />
          </div>

          {/* Output states */}
          {!queried && (
            <div style={{ textAlign: "center", padding: 32, color: "#334155", fontSize: 12 }}>
              ↑ Select a zone and click RUN ANALYSIS to get AI-powered outbreak prediction
            </div>
          )}

          {loading && (
            <div style={{ textAlign: "center", padding: 24 }}>
              <div style={{ fontSize: 28, display: "inline-block", animation: "spin 1s linear infinite" }}>⚙️</div>
              <div style={{ fontSize: 12, color: "#6366f1", marginTop: 10 }}>Analyzing sales anomalies via Gemini...</div>
            </div>
          )}

          {result && !loading && (
            <div style={{
              background: "#020817",
              border: "1px solid #1e293b",
              borderRadius: 8,
              padding: 16,
              marginTop: 14,
              fontSize: 12,
              lineHeight: 1.7,
              color: "#94a3b8",
              whiteSpace: "pre-wrap",
              maxHeight: 320,
              overflowY: "auto",
            }}>
              <div style={{ fontSize: 9, color: "#4f46e5", letterSpacing: "2px", marginBottom: 10, fontWeight: 700 }}>
                ◆ GEMINI ANALYSIS REPORT · {new Date().toLocaleString()}
              </div>
              {result}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
