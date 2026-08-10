import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    { id: 1, name: 'Downtown Office Tower', description: 'A 20-story commercial office building in the city center.', status: 'in-progress', startDate: '2025-01-15', endDate: '2026-06-30', budget: 12000000, location: 'New York, NY', managerId: 1, progress: 45, managerName: 'John Smith', actualCost: 5400000 },
    { id: 2, name: 'Riverside Apartments', description: 'Luxury residential complex with 120 units along the river.', status: 'planning', startDate: '2026-03-01', endDate: '2027-09-15', budget: 8500000, location: 'Chicago, IL', managerId: 2, progress: 10, managerName: 'Sarah Johnson', actualCost: 850000 },
    { id: 3, name: 'Highway Bridge Repair', description: 'Structural repair and reinforcement of the Route 9 bridge.', status: 'completed', startDate: '2024-05-10', endDate: '2025-02-28', budget: 3200000, location: 'Boston, MA', managerId: 1, progress: 100, managerName: 'John Smith', actualCost: 3150000 },
    { id: 4, name: 'Shopping Mall Renovation', description: 'Full interior renovation of the Westfield shopping center.', status: 'on-hold', startDate: '2025-07-01', endDate: '2026-01-31', budget: 5100000, location: 'Houston, TX', managerId: 3, progress: 25, managerName: 'Michael Chen', actualCost: 1275000 },
  ];

  private nextId = 5;

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  getProject(id: number): Observable<Project | undefined> {
    return of(this.projects.find(p => p.id === id));
  }

  createProject(project: Omit<Project, 'id'>): Observable<Project> {
    const newProject = { ...project, id: this.nextId++ };
    this.projects.push(newProject);
    return of(newProject);
  }

  updateProject(id: number, project: Partial<Project>): Observable<Project | undefined> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      this.projects[index] = { ...this.projects[index], ...project };
      return of(this.projects[index]);
    }
    return of(undefined);
  }

  deleteProject(id: number): Observable<boolean> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      this.projects.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
