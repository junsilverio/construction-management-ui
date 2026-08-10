export type ProjectStatus = 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'at-risk' | 'delayed';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: number;
  actualCost?: number;
  location: string;
  managerId: number;
  managerName?: string;
  progress: number;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  tasks?: ProjectTask[];
}

export interface ProjectTask {
  id: string;
  name: string;
  start: string;
  end: string;
  progress: number;
  dependencies?: string;
  custom_class?: string;
}

export interface ProjectExportData {
  project: Project;
  tasks: ProjectTask[];
}
