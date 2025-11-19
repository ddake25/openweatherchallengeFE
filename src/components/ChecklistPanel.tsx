// src/components/ChecklistPanel.tsx
import React from "react";
import type { ChecklistItem, LLMExplanation } from "../api/healthRisk";

type Props = {
  checklist: ChecklistItem[];
  explanation: LLMExplanation;
};

export const ChecklistPanel: React.FC<Props> = ({ checklist, explanation }) => {
  const actions = explanation.actions ?? [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-md space-y-6">
      <h2 className="text-base md:text-lg font-semibold text-slate-900">
        Personal Health Checklist
      </h2>
      <p className="text-xs md:text-sm text-slate-500">
        Generated from today&apos;s environmental conditions and your profile.
      </p>

      {/* Checklist bullets (from backend "checklist" + actions as backup) */}
      <div className="space-y-2">
        <ul className="space-y-2 text-sm md:text-base text-slate-800">
          {(checklist.length ? checklist : actions.map((text) => ({ text }))).map(
            (item, idx) => {
              const clean = item.text.replace(/^\s*[-•]\s*/, "");
              return (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  <span>{clean}</span>
                </li>
              );
            }
          )}
        </ul>
      </div>

      {/* Profile-specific note */}
      {explanation.profile_specific_note && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3">
          <p className="text-xs font-semibold text-emerald-800 mb-1">
            Profile note
          </p>
          <p className="text-sm text-emerald-900">
            {explanation.profile_specific_note}
          </p>
        </div>
      )}

      {/* Explanation block */}
      <div className="rounded-xl bg-white border border-slate-200 px-4 py-4">
        <p className="text-xs font-semibold text-indigo-700 mb-1">Explanation</p>
        <p className="text-sm md:text-base font-semibold text-slate-900 mb-2">
          {explanation.summary}
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          {explanation.details}
        </p>
      </div>
    </div>
  );
};
