
export type IncidentSeverity = "low" | "medium" | "high";

export interface Incident {
  id: string;
  title: string;
  severity: IncidentSeverity;
  service: string;
  description: string;
  createdAt: string;
}
