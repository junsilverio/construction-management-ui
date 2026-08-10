export type ProjectStatus = 'planning' | 'in-progress' | 'on-hold' | 'completed';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  budget: number;
  location: string;
  managerId: number;
}
