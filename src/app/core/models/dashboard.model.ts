export interface MetricCard {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  color: string;
}

export interface ProjectStatus {
  status: string;
  count: number;
  percentage: number;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed';
  color: string;
}

export interface Activity {
  id: string;
  icon: string;
  color: string;
  title: string;
  project: string;
  time: string;
}

export interface Alert {
  id: string;
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  time: string;
}

export interface Weather {
  temperature: number;
  condition: string;
  humidity: number;
  forecast: Array<{
    day: string;
    condition: string;
    temp: number;
  }>;
}

export interface BudgetData {
  project: string;
  budget: number;
  actual: number;
}

export interface CostBreakdown {
  category: string;
  percentage: number;
  amount: number;
  color: string;
}

export interface Resource {
  name: string;
  percentage: number;
  color: string;
}

export interface Document {
  type: string;
  count: number;
  icon: string;
  color: string;
}

export interface Integration {
  name: string;
  icon: string;
  color: string;
}

export interface Task {
  status: string;
  count: number;
  color: string;
}

export interface ProjectPhase {
  phase: string;
  projectCount: number;
}
