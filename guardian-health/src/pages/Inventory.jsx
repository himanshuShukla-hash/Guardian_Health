import { useState } from "react";
import { MEDS, SHOPS } from "../data/mockData";
import { s } from "../utils/styles";

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const BASELINE = 75;

export default function Inventory() {
  const [selectedShop, setSelectedShop] = useState("s1");
  const [inventoryData, setInventoryData] = useState(
    Object.fromEntries(MEDS.map((m) => [m, rand(40, 120)]))
  );
  const [newEntry, setNewEntry] = useState({ med: MEDS[0], qty: "" });
  const [logged, setLogged] = useState(false);

  const handleLog = () => {
    if (!newEntry.qty || isNaN(newEntry.qty)) return;
    setInventoryData((prev) => ({ ...prev, [newEntry.med]: Number(newEntry.qty) }));
    setNewEntry({ med: MEDS[0], qty: "" });
    setLogged(true);
    setTimeout(() => setLogged(false), 2000);
  };

  return (
    <main style={s.main}>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#f8fafc" }}>🏪 Chemist Inventory Tracker</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>
            Log daily high-demand medicine sales to contribute to outbreak detection
          </div>
        </div>
        <select
          style={{ ...s.select, width: "auto" }}
          value={selectedShop}
          onChange={(e) => setSelectedShop(e.target.value)}
        >
          {SHOPS.map((shop) => (
            <option key={shop.id} value={shop.id}>{shop.name}</option>
          ))}
        </select>
      </div>

      {/* Log entry */}
      <div style={{ ...s.card, marginBottom: 16 }}>
        <div style={s.cardTitle}>LOG TODAY'S SALES</div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div style={{ flex: 2 }}>
            <div style={{ fontSize: 10, color: "#64748b", marginBottom: 6 }}>MEDICINE</div>
            <select
              style={s.select}
              value={newEntry.med}
              onChange={(e) => setNewEntry((p) => ({ ...p, med: e.target.value }))}
            >
              {MEDS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "#64748b", marginBottom: 6 }}>UNITS SOLD TODAY</div>
            <input
              style={s.input}
              type="number"
              placeholder="e.g. 85"
              value={newEntry.qty}
              onChange={(e) => setNewEntry((p) => ({ ...p, qty: e.target.value }))}
            />
          </div>
          <button
            onClick={handleLog}
            style={{
              background: logged ? "#166534" : "#1d4ed8",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "8px 20px",
              fontSize: 12,
              fontWeight: 700,
              fontFamily: "inherit",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "background 0.3s",
            }}
          >
            {logged ? "✓ LOGGED" : "+ LOG"}
          </button>
        </div>
      </div>

      {/* Medicine grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {MEDS.map((med) => {
          const qty = inventoryData[med] || 0;
          const spikeRatio = qty / BASELINE;
          const isSpike = spikeRatio >= 1.5;
          const barPct = Math.min(100, (qty / 200) * 100);

          return (
            <div
              key={med}
              style={{
                background: "#020817",
                border: `1px solid ${isSpike ? "#dc262633" : "#1e293b"}`,
                borderRadius: 8,
                padding: "12px 14px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>{med}</div>
                {isSpike && (
                  <span style={{ fontSize: 9, background: "#450a0a", color: "#ef4444", padding: "2px 8px", borderRadius: 6, fontWeight: 700 }}>
                    ⚠ SPIKE
                  </span>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 700, color: isSpike ? "#ef4444" : "#22c55e", marginBottom: 8 }}>
                {qty}
                <span style={{ fontSize: 11, color: "#64748b", alignSelf: "flex-end" }}>
                  {(spikeRatio * 100).toFixed(0)}% of baseline
                </span>
              </div>
              <div style={{ height: 4, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${barPct}%`,
                    background: isSpike ? "#ef4444" : "#22c55e",
                    borderRadius: 4,
                    transition: "width 0.5s",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* How it works */}
      <div style={{ ...s.card, marginTop: 16, borderColor: "#16537044" }}>
        <div style={s.cardTitle}>HOW GUARDIAN HEALTH WORKS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
          {[
            ["1", "Chemists log daily sales", "📋"],
            ["2", "AI detects anomaly spikes", "🔍"],
            ["3", "Outbreak pattern identified", "🦠"],
            ["4", "Alert sent 3–5 days early", "🚨"],
          ].map(([n, t, ic]) => (
            <div key={n} style={{ textAlign: "center", padding: 12 }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{ic}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#475569", marginBottom: 4 }}>STEP {n}</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
