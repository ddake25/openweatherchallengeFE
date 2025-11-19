import { useState } from "react";
import { fetchHealthRisk } from "./api/healthRisk";
import type { HealthRiskResponse } from "./api/healthRisk";
import { RiskSummaryCard } from "./components/RiskSummaryCard";
import { EnvironmentalSnapshot } from "./components/EnvironmentalSnapshot";
import { ContributingFactorsCharts } from "./components/ContributingFactorsCharts";
import { ChecklistPanel } from "./components/ChecklistPanel";
import { DashboardSkeleton } from "./components/DashboardSkeleton";

const DEFAULT_CITY = "London";

function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [age, setAge] = useState<string>("30");
 
  const [conditions, setConditions] = useState<string>("asthma, hypertension");

  const [data, setData] = useState<HealthRiskResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFetch() {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const profileConditions = conditions
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      const reqBody = {
        city: city || DEFAULT_CITY,
        profile: {
          age: age ? Number(age) : undefined,
          conditions: profileConditions,
        },
      };

      const res = await fetchHealthRisk(reqBody);
      setData(res);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch risk data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-6">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Weather-Driven Health Risk Dashboard
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-1">
              Uses OpenWeather + AI to explain asthma, heat, and dehydration risk
              in plain language for everyday people.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleFetch}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 px-4 py-2 text-xs font-semibold text-slate-950 shadow shadow-emerald-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Analyzing..." : "Analyze Today"}
            </button>
          </div>
        </header>

        {/* Controls */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/40">
          <h2 className="text-md font-semibold text-slate-100 mb-3">
            Location & Profile
          </h2>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-100">City</label>
              <input
                className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. London"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-100">Age</label>
              <input
                type="number"
                className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 30"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-slate-100">
                Health notes (optional, comma-separated)
              </label>
              <input
                className="rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                placeholder="e.g. asthma, hypertension"
              />
              <p className="text-sm font-semibold text-slate-100">
                Used only to personalize the explanation and checklist. Risk scores
                are based on weather, air quality, and age.
              </p>
            </div>
          </div>
        </section>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </div>
        )}

        {!data && !loading && !error && (
          <p className="text-sm text-slate-600">
            Enter your city + age (and optionally health notes), then click{" "}
            <span className="font-semibold">Analyze Today</span> to see risk
            insights.
          </p>
        )}

        {loading && <DashboardSkeleton />}

        {!loading && data && (
          <main className="space-y-5">
            {/* Row 1: Summary + Snapshot */}
            <div className="grid md:grid-cols-2 gap-4">
              <RiskSummaryCard
                summary={data.risk_summary}
                locationName={data.location.name}
              />
              <EnvironmentalSnapshot raw={data.raw_data} />
            </div>

            {/* Row 2: Contributing factors */}
            <ContributingFactorsCharts factors={data.contributing_factors} />

            {/* Row 3: Checklist + Explanation */}
            <ChecklistPanel
              checklist={data.checklist}
              explanation={data.llm_explanation}
            />
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
