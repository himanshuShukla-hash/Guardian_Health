export const ZONES = [
  { id: "z1", name: "Dharavi",  lat: 19.043,  lng: 72.854,  pop: 85000 },
  { id: "z2", name: "Kurla",    lat: 19.0726, lng: 72.8864, pop: 62000 },
  { id: "z3", name: "Andheri",  lat: 19.1197, lng: 72.8468, pop: 75000 },
  { id: "z4", name: "Bandra",   lat: 19.054,  lng: 72.8407, pop: 48000 },
  { id: "z5", name: "Chembur",  lat: 19.0627, lng: 72.9007, pop: 55000 },
  { id: "z6", name: "Malad",    lat: 19.1863, lng: 72.8486, pop: 70000 },
  { id: "z7", name: "Worli",    lat: 18.9987, lng: 72.8156, pop: 38000 },
  { id: "z8", name: "Govandi",  lat: 19.0524, lng: 72.9279, pop: 45000 },
];

export const SHOPS = [
  { id: "s1", name: "MedPlus Dharavi",           zone: "z1" },
  { id: "s2", name: "Apollo Pharmacy Kurla",      zone: "z2" },
  { id: "s3", name: "Jan Aushadhi Andheri",       zone: "z3" },
  { id: "s4", name: "Wellness Forever Bandra",    zone: "z4" },
  { id: "s5", name: "NetMeds Chembur",            zone: "z5" },
  { id: "s6", name: "Noble Chemist Malad",        zone: "z6" },
  { id: "s7", name: "Shree Pharmacy Worli",       zone: "z7" },
  { id: "s8", name: "City Medicals Govandi",      zone: "z8" },
];

export const MEDS = [
  "Paracetamol", "Ibuprofen", "ORS",
  "Azithromycin", "Loperamide", "Cetirizine",
  "Oseltamivir", "Metronidazole",
];

export const OUTBREAKS = [
  {
    zone: "z1",
    disease: "Dengue Fever",
    severity: "CRITICAL",
    spike: 4.2,
    meds: ["Paracetamol", "ORS"],
    days: 2,
    advice:
      "Vector control measures needed. Larvicide deployment in stagnant water bodies. Alert civil hospitals.",
  },
  {
    zone: "z5",
    disease: "Gastroenteritis",
    severity: "HIGH",
    spike: 3.1,
    meds: ["ORS", "Loperamide"],
    days: 4,
    advice:
      "Check water supply in Chembur East. Distribute ORS packets at primary health centres.",
  },
  {
    zone: "z8",
    disease: "Cholera (Suspect)",
    severity: "CRITICAL",
    spike: 5.0,
    meds: ["ORS", "Azithromycin", "Loperamide"],
    days: 1,
    advice:
      "URGENT: Possible contaminated water source. Boil-water advisory. Rapid response team dispatch recommended.",
  },
];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTrend(zoneId, days = 14) {
  const outbreak = OUTBREAKS.find((o) => o.zone === zoneId);
  return Array.from({ length: days }, (_, i) => {
    const base = rand(60, 100);
    if (outbreak && i >= days - 4) {
      return Math.round(base * (1 + (outbreak.spike - 1) * ((i - (days - 4)) / 3)));
    }
    return base;
  });
}

export const TREND_DATA = Object.fromEntries(
  ZONES.map((z) => [z.id, generateTrend(z.id)])
);

export const ZONE_RISK = Object.fromEntries(
  ZONES.map((z) => {
    const ob = OUTBREAKS.find((o) => o.zone === z.id);
    const score = ob ? (ob.severity === "CRITICAL" ? 95 : 72) : rand(8, 35);
    return [z.id, score];
  })
);
