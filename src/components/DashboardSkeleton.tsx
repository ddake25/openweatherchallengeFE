import React from "react";

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-5">
      {/* Row 1 */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="h-40 rounded-2xl bg-slate-200/70 animate-pulse" />
        <div className="h-40 rounded-2xl bg-slate-200/70 animate-pulse" />
      </div>

      {/* Row 2 */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="h-56 rounded-2xl bg-slate-200/70 animate-pulse" />
        <div className="h-56 rounded-2xl bg-slate-200/70 animate-pulse" />
      </div>

      {/* Row 3 */}
      <div className="h-56 rounded-2xl bg-slate-200/70 animate-pulse" />
    </div>
  );
};
