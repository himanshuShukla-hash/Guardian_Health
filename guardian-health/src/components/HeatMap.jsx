import { useEffect, useRef } from "react";

const MIN_LAT = 18.94, MAX_LAT = 19.25;
const MIN_LNG = 72.78, MAX_LNG = 72.98;

function riskColor(r) {
  if (r >= 80) return "#ef4444";
  if (r >= 50) return "#f97316";
  if (r >= 25) return "#eab308";
  return "#22c55e";
}

export default function HeatMap({ zones, riskData, selectedZone, onSelect }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const toX = (lng) => ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * W;
    const toY = (lat) => H - ((lat - MIN_LAT) / (MAX_LAT - MIN_LAT)) * H;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      ctx.beginPath(); ctx.moveTo((i * W) / 10, 0); ctx.lineTo((i * W) / 10, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, (i * H) / 10); ctx.lineTo(W, (i * H) / 10); ctx.stroke();
    }

    // Heat blobs
    zones.forEach((z) => {
      const x = toX(z.lng);
      const y = toY(z.lat);
      const risk = riskData[z.id] || 10;
      const radius = 30 + risk * 0.6;
      const alpha = 0.15 + (risk / 100) * 0.6;
      const col = riskColor(risk);

      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, col.replace(")", `,${alpha})`).replace("rgb", "rgba"));
      grad.addColorStop(1, col.replace(")", `,0)`).replace("rgb", "rgba"));

      // Simpler: just use hex with alpha manually
      const hexAlpha = Math.round(alpha * 255).toString(16).padStart(2, "0");
      const grad2 = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad2.addColorStop(0, col + hexAlpha);
      grad2.addColorStop(1, col + "00");

      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Markers
    zones.forEach((z) => {
      const x = toX(z.lng);
      const y = toY(z.lat);
      const risk = riskData[z.id] || 10;
      const col = riskColor(risk);
      const isSelected = selectedZone === z.id;

      if (risk >= 80) {
        ctx.beginPath();
        ctx.arc(x, y, isSelected ? 18 : 14, 0, Math.PI * 2);
        ctx.strokeStyle = col + "66";
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(x, y, isSelected ? 10 : 7, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
      ctx.strokeStyle = isSelected ? "#ffffff" : "#0f172a";
      ctx.lineWidth = isSelected ? 2.5 : 1.5;
      ctx.stroke();

      ctx.fillStyle = "#f8fafc";
      ctx.font = `${isSelected ? "bold " : ""}10px monospace`;
      ctx.textAlign = "center";
      ctx.fillText(z.name, x, y - 14);
    });
  }, [zones, riskData, selectedZone]);

  const handleClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const cx = (e.clientX - rect.left) * (canvas.width / rect.width);
    const cy = (e.clientY - rect.top) * (canvas.height / rect.height);

    const toX = (lng) => ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * canvas.width;
    const toY = (lat) => canvas.height - ((lat - MIN_LAT) / (MAX_LAT - MIN_LAT)) * canvas.height;

    let closest = null;
    let minDist = Infinity;
    zones.forEach((z) => {
      const d = Math.hypot(toX(z.lng) - cx, toY(z.lat) - cy);
      if (d < minDist) { minDist = d; closest = z.id; }
    });
    if (minDist < 50) onSelect(closest === selectedZone ? null : closest);
  };

  return (
    <canvas
      ref={canvasRef}
      width={520}
      height={380}
      onClick={handleClick}
      style={{ width: "100%", height: "100%", cursor: "crosshair", borderRadius: "8px" }}
    />
  );
}
