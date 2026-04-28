import { useState } from "react";
import HeatMap from "./HeatMap";
import Sparkline from "./Sparkline";
import { ZONES, SHOPS, OUTBREAKS, TREND_DATA, ZONE_RISK } from "../data/mockData";
import { riskLabel, riskColor, riskBg, s } from "../utils/styles";

export default function Dashboard() {
  const [selectedZone, setSelectedZone] = useState("z1");

  const selectedZoneObj = ZONES.find((z) => z.id === selectedZone);
  const zoneRisk = ZONE_RISK[selectedZone] || 10;
  const zoneTrend = TREND_DATA[selectedZone] || [];
  const zoneOutbreak = OUTBREAKS.find((o) => o.zone === selectedZone);

  return (
    <main style={s.main}>
      {/* Stat cards */}
      <div style={s.grid3}>
        {[
          { label: "ACTIVE ALERTS",    value: OUTBREAKS.length, sub: "2 critical zones",    icon: "🚨", col: "#ef4444" },
          { label: "ZONES MONITORED",  value: ZONES.length,     sub: "Real-time tracking",  icon: "📍", col: "#3b82f6" },
          { label: "CHEMIST SHOPS",    value: SHOPS.length,     sub: "Data contributors",   icon: "🏪", col: "#22c55e" },
        ].map((stat) => (
          <div key={stat.label} style={{ ...s.card, borderColor: stat.col + "33" }}>
            <div style={s.cardTitle}>{stat.label}</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
              <div style={{ fontSize: 28 }}>{stat.icon}</div>
              <div>
                <div style={{ ...s.statNum, color: stat.col }}>{stat.value}</div>
                <div style={s.statSub}>{stat.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map + zone list */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 16 }}>
        <div style={s.mapCard}>
          <div style={s.mapHeader}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#f8fafc" }}>🗺️ Live Outbreak Heatmap</div>
              <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>Click a zone to inspect · Mumbai Region</div>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 10, color: "#64748b" }}>
              {[["#ef4444","Critical"],["#f97316","High"],["#eab308","Medium"],["#22c55e","Low"]].map(([c, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />{l}
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: 380 }}>
            <HeatMap zones={ZONES} riskData={ZONE_RISK} selectedZone={selectedZone} onSelect={setSelectedZone} />
          </div>
        </div>

        <div style={s.zonePanel}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #1e293b", background: "#020817" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#f8fafc" }}>Zone Risk Index</div>
            <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>Sorted by risk · 14-day trend</div>
          </div>
          <div style={{ overflowY: "auto", flex: 1 }}>
            {[...ZONES]
              .sort((a, b) => (ZONE_RISK[b.id] || 0) - (ZONE_RISK[a.id] || 0))
              .map((z) => {
                const r = ZONE_RISK[z.id] || 10;
                return (
                  <div key={z.id} style={s.zoneItem(selectedZone === z.id)} onClick={() => setSelectedZone(z.id)}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{z.name}</div>
                      <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>Pop: {z.pop.toLocaleString()}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <span style={s.riskBadge(r)}>{riskLabel(r)}</span>
                      <Sparkline data={TREND_DATA[z.id] || []} color={riskColor(r)} width={80} height={24} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Selected zone detail */}
      {selectedZone && (
        <div style={{ ...s.card, marginTop: 16, borderColor: riskColor(zoneRisk) + "44" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#f8fafc" }}>📍 {selectedZoneObj?.name}</div>
                <span style={s.riskBadge(zoneRisk)}>⚠ {riskLabel(zoneRisk)} RISK · {zoneRisk}/100</span>
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>
                Population at risk: {selectedZoneObj?.pop?.toLocaleString()} · Risk Score: {zoneRisk}%
              </div>
            </div>
            <Sparkline data={zoneTrend} color={riskColor(zoneRisk)} width={160} height={48} />
          </div>
          {zoneOutbreak && (
            <div style={{ marginTop: 14, padding: 14, background: riskBg(zoneRisk), borderRadius: 8, border: `1px solid ${riskColor(zoneRisk)}33` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: riskColor(zoneRisk), marginBottom: 6 }}>
                🔬 {zoneOutbreak.disease} — Detected {zoneOutbreak.days}d ago
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{zoneOutbreak.advice}</div>
              <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {zoneOutbreak.meds.map((m) => (
                  <span key={m} style={{ padding: "2px 10px", borderRadius: 6, background: "#0f172a", border: "1px solid #334155", fontSize: 10, color: "#94a3b8" }}>
                    📈 {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
