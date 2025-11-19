export type HealthRiskRequestBody = {
  city?: string;
  location?: {
    lat: number;
    lon: number;
    name?: string;
  };
  profile?: {
    age?: number;
    conditions: string[];
  };
};

export type RiskLevel = {
  level: string; // "Low" | "Moderate" | "High" | etc.
  score: number; // 0-5
};

export type RiskScore = {
  level: string;
  score: number;
};

export type Scores = {
  asthma_risk: RiskScore;
  heat_risk: RiskScore;
  dehydration_risk: RiskScore;  
  overall_risk: RiskScore;
};

export type RawWeather = {
  temperature_c: number;
  humidity: number;
  heat_index_c: number;
};

export type RawAirQuality = {
  aqi: number;
  pm25?: number;
  pm10?: number;
  o3?: number;
};

export type RawData = {
  weather: RawWeather;
  air_quality: RawAirQuality;
};

export type ForecastPoint = {
  time: string;
  asthma_risk_level: string;
  heat_risk_level: string;
  overall_risk_score: number;
};

export type LLMExplanation = {
  summary: string;
  details: string;
  actions: string[];
  profile_specific_note?: string;
};

export type RiskSummary = {
  overall_level: string;
  overall_score: number;
  asthma_level: string;
  heat_level: string;
  dehydration_level: string;     
  rating: string;
  message: string;
};

export type ContributingFactor = {
  factor: string;
  percentage: number;
};

export type ContributingFactors = {
  asthma: ContributingFactor[];
  heat: ContributingFactor[];
  dehydration: ContributingFactor[];  
};


export type ChecklistItem = {
  text: string;
};

export type HealthRiskResponse = {
  location: {
    lat: number;
    lon: number;
    name?: string;
  };
  timestamp: string;
  raw_data: RawData;
  scores: Scores;
  forecast: ForecastPoint[];
  llm_explanation: LLMExplanation;
  risk_summary: RiskSummary;
  contributing_factors: ContributingFactors;
  checklist: ChecklistItem[];
};


const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export async function fetchHealthRisk(body: HealthRiskRequestBody): Promise<HealthRiskResponse> {
  const res = await fetch(`${API_BASE}/api/health-risk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error ${res.status}: ${errorText}`);
  }

  return res.json();
}
