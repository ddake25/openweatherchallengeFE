import React from "react";
import type { RawData } from "../api/healthRisk";

type Props = {
  raw: RawData;
};

export const EnvironmentalSnapshot: React.FC<Props> = ({ raw }) => {
  const { weather, air_quality } = raw;
  const items = [
    {
      label: "Temperature",
      value: `${weather.temperature_c.toFixed(1)} °C`,
    },
    {
      label: "Humidity",
      value: `${weather.humidity.toFixed(0)} %`,
    },
    {
      label: "Heat Index",
      value: `${weather.heat_index_c.toFixed(1)} °C`,
    },
    {
      label: "AQI",
      value: `${air_quality.aqi}`,
    },
    {
      label: "PM2.5",
      value:
        air_quality.pm25 !== undefined
          ? `${air_quality.pm25.toFixed(1)} µg/m³`
          : "—",
    },
    {
      label: "PM10",
      value:
        air_quality.pm10 !== undefined
          ? `${air_quality.pm10.toFixed(1)} µg/m³`
          : "—",
    },
    {
      label: "Ozone (O₃)",
      value:
        air_quality.o3 !== undefined ? `${air_quality.o3.toFixed(1)}` : "—",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <h2 className="text-sm font-semibold text-slate-900 mb-4">
        Environmental Snapshot
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              {item.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
