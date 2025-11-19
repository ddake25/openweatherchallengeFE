import React from "react";
import type { RiskSummary } from "../api/healthRisk";

type Props = {
  summary: RiskSummary;
  locationName?: string;
};

export const RiskSummaryCard: React.FC<Props> = ({ summary, locationName }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <div className="flex items-start justify-between gap-4">
        {/* Left side: main label and overall badge */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
            Today&apos;s risk in {locationName || "your area"}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold bg-emerald-50 text-emerald-700 border-emerald-200">
              Overall: {summary.overall_level} (Score {summary.overall_score}, Rating{" "}
              {summary.rating})
            </span>
          </div>

          <p className="mt-3 text-sm md:text-base text-slate-700">
            {summary.message}
          </p>
        </div>

        {/* Right side: dimension breakdown */}
        <div className="text-right text-xs md:text-sm text-slate-700 space-y-1">
          <div>
            <span className="font-semibold text-slate-900">Asthma risk:</span>{" "}
            {summary.asthma_level}
          </div>
          <div>
            <span className="font-semibold text-slate-900">Heat risk:</span>{" "}
            {summary.heat_level}
          </div>
          <div>
            <span className="font-semibold text-slate-900">Dehydration risk:</span>{" "}
            {summary.dehydration_level}
          </div>
        </div>
      </div>
    </div>
  );
};
