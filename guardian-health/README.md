# 🛡️ Guardian Health
### Disease Outbreak Early Warning System

Guardian Health is a health-tech platform that predicts localized disease outbreaks **3–5 days before hospital reporting** by analyzing real-time medicine sales data from local chemist shops.

When a disease starts spreading, people buy medicines before they visit a hospital. Guardian Health captures this signal — sharp spikes in the purchase of fever reducers, ORS, antibiotics — and uses AI to identify outbreak patterns at the neighborhood level before they become a public health crisis.

---

## The Problem

Traditional disease surveillance relies on hospital reporting, which lags the actual spread by 5–10 days. By the time data reaches health officials, thousands more people may already be infected. In dense urban areas like Mumbai, Dhaka, or Nairobi, this delay costs lives.

## The Solution

Guardian Health connects local chemist shops as data contributors. When sales of specific medicine combinations spike beyond statistical baselines in a geographic zone, the system triggers an early warning — giving health officials a 3–5 day head start to deploy response teams, issue advisories, and pre-position supplies.

---

## Features

**Real-time Dashboard**
- Interactive heatmap of monitored zones color-coded by outbreak risk
- 14-day sales trend sparklines per zone
- Click any zone for detailed risk breakdown and detected outbreak data

**Inventory Tracker**
- Chemists log daily high-demand medicine sales
- Automatic spike detection against rolling 7-day baseline
- Visual alerts when a medicine crosses the 1.5× threshold

**AI Insights Panel**
- Powered by Google Gemini 1.5 Flash
- Analyzes sales anomaly data and generates clinical outbreak prediction reports
- Estimates likely pathogen, population at risk, spread vector, and 5-day forecast
- Provides actionable recommendations for health officials

**Alert System**
- Severity-tiered alerts (CRITICAL / HIGH) with zone, spike magnitude, and first-detection date
- One-click actions to notify officials or issue resident advisories

---

## Tech Stack

- **Frontend:** React 18
- **AI:** Google Gemini 1.5 Flash API
- **Maps:** HTML5 Canvas heatmap (Google Maps API ready)
- **Data:** Simulated real-time chemist sales data (Firebase Firestore integration ready)

---

## Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/your-username/guardian-health.git
cd guardian-health
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up your Gemini API key**

Get a free API key from [Google AI Studio](https://aistudio.google.com).

```bash
cp .env.example .env
```

Open `.env` and add your key:
```
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

**4. Run the app**
```bash
npm start
```

The app will open at `http://localhost:3000`.

---

## Project Structure

```
guardian-health/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── HeatMap.jsx       # Canvas-based outbreak heatmap
│   │   └── Sparkline.jsx     # 14-day trend chart
│   ├── data/
│   │   └── mockData.js       # Zones, shops, outbreak patterns
│   ├── pages/
│   │   ├── Dashboard.jsx     # Main heatmap + zone risk view
│   │   ├── Inventory.jsx     # Chemist sales logging
│   │   ├── Alerts.jsx        # Active outbreak alerts
│   │   └── AIInsights.jsx    # Gemini-powered analysis panel
│   ├── utils/
│   │   ├── gemini.js         # Gemini API integration
│   │   └── styles.js         # Shared styles and helpers
│   ├── App.js
│   └── index.js
├── .env.example
├── .gitignore
└── package.json
```

---

## SDG Alignment

This project contributes to **UN Sustainable Development Goal 3: Good Health and Well-Being**.

Early outbreak detection reduces mortality in under-resourced health systems, helps prevent epidemics in high-density communities, and enables faster, more targeted public health responses.

---

## Roadmap

- Firebase Firestore integration for real chemist data ingestion
- Google Maps JS API heatmap layer replacement
- SMS alert system via Twilio for health officials
- Predictive spread modeling using mobility data
- Multi-city support beyond Mumbai

---

## Built For

Google Solution Challenge 2026
