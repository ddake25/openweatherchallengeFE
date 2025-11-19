import React from "react";
import type { ContributingFactors } from "../api/healthRisk";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Props = {
  factors: ContributingFactors;
};

const COLORS = ["#22c55e", "#f97316", "#6366f1", "#0ea5e9"];

const ChartCard: React.FC<{
  title: string;
  data: { factor: string; percentage: number }[];
}> = ({ title, data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md flex items-center justify-center">
        <p className="text-xs text-slate-500">No data</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md flex flex-col">
      <h3 className="text-sm font-semibold text-slate-900 mb-2">{title}</h3>
      <div className="flex-1 flex items-center">
        <ResponsiveContainer width="50%" height={160}>
          <PieChart>
            <Pie
              data={data}
              dataKey="percentage"
              nameKey="factor"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.factor}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: any, name: any) => [`${value}%`, name]} />
          </PieChart>
        </ResponsiveContainer>
        <ul className="ml-4 space-y-1 text-xs text-slate-700">
          {data.map((item, index) => (
            <li key={item.factor} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span>{item.factor}</span>
              <span className="ml-auto font-medium">{item.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const ContributingFactorsCharts: React.FC<Props> = ({ factors }) => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <ChartCard title="Asthma drivers" data={factors.asthma} />
      <ChartCard title="Heat drivers" data={factors.heat} />
      <ChartCard title="Dehydration drivers" data={factors.dehydration} />
    </div>
  );
};
