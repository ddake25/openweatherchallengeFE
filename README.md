


# Weather-Driven Health Risk Dashboard (Frontend)

## Overview
React + TypeScript frontend for the **Weather-Driven Health Risk API**.  
Provides an interactive dashboard that turns backend JSON into:

- Clear **risk cards** (asthma, heat, dehydration, overall)
- A **24-hour risk timeline**
- **AI-generated explanations** and an **action checklist**
- Simple profile input (age + conditions)

Designed to be fast, lightweight, and easy to plug into the backend (`openweatherchallengeBE`).


## What the Frontend Does

- Lets the user:
  - Enter a **city** (and optionally country code)
  - Provide a basic **profile** (age + conditions like “asthma”)
- Calls the backend `/analyze` endpoint
- Renders:
  - **Overall daily risk** badge/label
  - **Asthma / Heat / Dehydration** risk cards
  - **24-hour risk outlook** chart (time vs risk level)
  - **LLM-generated explanation** (summary + detailed text)
  - **Action checklist** with practical tips
- Shows:
  - Loading states while data is being fetched
  - Error messages if the API is unreachable or returns an error
- Mobile-friendly layout (responsive) using Tailwind CSS



## High-Level Architecture

- **UI Framework:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** fetch / axios (depending on your actual implementation)
- **Backend:** Expects the FastAPI service from `openweatherchallengeBE`

Typical flow:

1. User enters city + optional profile info.
2. Frontend sends a POST request to `{API_BASE_URL}/analyze`.
3. Receives JSON with:
   - `scores`, `drivers`, `forecast`, `llm`, `weather`, `air_quality`, etc.

4. Components map this into:
   - Summary header
   - Risk cards
   - Timeline chart
   - Explanation + checklist


## UI Sections (Typical Layout)

- **Header / Hero**
  - App title + short tagline (weather → health risk insights)

- **Input Panel**
  - City input
  - Optional country code
  - Age field
  - Conditions (comma-separated or tags)

- **Risk Summary**
  - Overall risk level (e.g., Low / Medium / High, A–E)
  - Quick color-coded indicator

- **Risk Detail Cards**
  - Asthma / Respiratory risk
  - Heat stress risk
  - Dehydration risk
  - Each with numeric level + short description

- **24-Hour Outlook**
  - Chart showing risk over the next 24 hours (e.g., line/bar chart)

- **AI Explanation Panel**
  - LLM-generated:
    - Summary
    - Detailed explanation
    - Action checklist
    - Optional note for the specific profile (e.g., “older adult with asthma”)

- **Footer**
  - Disclaimer and links (e.g., backend repo, OpenWeather)

## Tech Stack

- **Language:** TypeScript
- **Framework:** React
- **Tooling:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React hooks / context (depending on your implementation)
- **API:** Custom client for the FastAPI backend


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
