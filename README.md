


# Weather-Driven Health Risk Dashboard (Frontend)

This is the React + TypeScript frontend for the **Weather-Driven Health Risk Dashboard**.

It connects to the FastAPI backend to display:

- **Today’s overall health risk** (asthma, heat, dehydration)
- **Environmental snapshot** (temperature, humidity, AQI, PM2.5, PM10, O₃)
- **Contributing factor charts** (what drives each risk)
- **AI-generated health checklist + explanation**
- **24-hour risk outlook**


## Key Features

- Clean, responsive layout built with **React + Vite + TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **Recharts** for donut/pie visualizations
- Small, focused components:
  - Risk summary card
  - Environmental snapshot panel
  - Contributing factors charts (asthma / heat / dehydration)
  - Checklist + profile note + explanation
  - Loading skeleton while waiting for backend + LLM


## Tech Stack

- **React 18** (with Vite)
- **TypeScript**
- **Tailwind CSS 4** (through `@tailwindcss/postcss` + PostCSS)
- **Recharts** for charts
- **Fetch API** to call the backend (`/api/health-risk`)


## Setup & Installation

- The frontend expects the backend to be running at `http://localhost:8000` (default FastAPI dev server).  
- Adjust the API base URL in `src/api/healthRisk.ts` or via environment variables if needed.

### 1. Use the same Conda environment (optional but convenient)

If you installed Node via Conda:

- conda activate weatherhealth
 or:
- conda create -n weatherhealth_node nodejs -y
- conda activate weatherhealth_node

### 2. Install Node dependencies
- npm install
           or
- npm install -D @tailwindcss/postcss autoprefixer
- npm install recharts

### 3. Tailwind / PostCSS Configuration
- postcss.config.cjs uses @tailwindcss/postcss:
    module.exports = {
      plugins: {
        "@tailwindcss/postcss": {},
        autoprefixer: {},
      },
    };

- tailwind.config.cjs includes the React + TS paths:
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{ts,tsx,js,jsx}",
      ],
      theme: {
        extend: {
          colors: {
            "risk-low": "#22c55e",
            "risk-moderate": "#eab308",
            "risk-high": "#f97316",
            "risk-very-high": "#ef4444",
          },
        },
      },
      plugins: [],
    };

- src/index.css should include:
    @tailwind base;
    @tailwind components;
    @tailwind utilities;


### 4. Environment variables
- VITE_API_BASE_URL=http://localhost:8000 # your backend url


### 5. Running the Frontend
- npm run dev
