import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project, ProjectTask } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  public projects$ = this.projectsSubject.asObservable();

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    const mockProjects: Project[] = [
      {
        id: 1,
        name: 'Downtown Plaza Construction',
        description: 'High-rise commercial building construction project',
        status: 'in-progress',
        startDate: '2024-01-15',
        endDate: '2025-12-30',
        budget: 5000000,
        actualCost: 3200000,
        location: 'Downtown, Metro City',
        managerId: 101,
        managerName: 'John Smith',
        progress: 65,
        priority: 'high',
        tasks: [
          {
            id: '1',
            name: 'Site Preparation',
            start: '2024-01-15',
            end: '2024-03-01',
            progress: 100,
            custom_class: 'completed'
          },
          {
            id: '2',
            name: 'Foundation Work',
            start: '2024-03-01',
            end: '2024-06-15',
            progress: 100,
            dependencies: '1',
            custom_class: 'completed'
          },
          {
            id: '3',
            name: 'Structural Framework',
            start: '2024-06-15',
            end: '2024-12-01',
            progress: 80,
            dependencies: '2',
            custom_class: 'in-progress'
          },
          {
            id: '4',
            name: 'MEP Installation',
            start: '2024-10-01',
            end: '2025-04-30',
            progress: 40,
            dependencies: '3',
            custom_class: 'in-progress'
          },
          {
            id: '5',
            name: 'Interior Finishing',
            start: '2025-04-01',
            end: '2025-09-30',
            progress: 0,
            dependencies: '4',
            custom_class: 'pending'
          },
          {
            id: '6',
            name: 'Final Inspection',
            start: '2025-10-01',
            end: '2025-12-30',
            progress: 0,
            dependencies: '5',
            custom_class: 'pending'
          }
        ]
      },
      {
        id: 2,
        name: 'Riverside Bridge Project',
        description: 'Modern suspension bridge connecting two districts',
        status: 'in-progress',
        startDate: '2024-03-01',
        endDate: '2026-06-30',
        budget: 12000000,
        actualCost: 4500000,
        location: 'Riverside District',
        managerId: 102,
        managerName: 'Sarah Johnson',
        progress: 35,
        priority: 'critical',
        tasks: [
          {
            id: '1',
            name: 'Environmental Survey',
            start: '2024-03-01',
            end: '2024-05-01',
            progress: 100,
            custom_class: 'completed'
          },
          {
            id: '2',
            name: 'Foundation Piles',
            start: '2024-05-01',
            end: '2024-10-01',
            progress: 100,
            dependencies: '1',
            custom_class: 'completed'
          },
          {
            id: '3',
            name: 'Tower Construction',
            start: '2024-10-01',
            end: '2025-06-01',
            progress: 60,
            dependencies: '2',
            custom_class: 'in-progress'
          },
          {
            id: '4',
            name: 'Cable Installation',
            start: '2025-06-01',
            end: '2025-12-01',
            progress: 0,
            dependencies: '3',
            custom_class: 'pending'
          },
          {
            id: '5',
            name: 'Deck Assembly',
            start: '2025-12-01',
            end: '2026-04-30',
            progress: 0,
            dependencies: '4',
            custom_class: 'pending'
          },
          {
            id: '6',
            name: 'Testing & Commissioning',
            start: '2026-05-01',
            end: '2026-06-30',
            progress: 0,
            dependencies: '5',
            custom_class: 'pending'
          }
        ]
      },
      {
        id: 3,
        name: 'Green Valley Residential Complex',
        description: 'Eco-friendly apartment complex with 200 units',
        status: 'planning',
        startDate: '2024-09-01',
        endDate: '2026-03-31',
        budget: 8000000,
        actualCost: 500000,
        location: 'Green Valley Suburb',
        managerId: 103,
        managerName: 'Michael Chen',
        progress: 10,
        priority: 'medium',
        tasks: [
          {
            id: '1',
            name: 'Land Acquisition',
            start: '2024-09-01',
            end: '2024-10-31',
            progress: 100,
            custom_class: 'completed'
          },
          {
            id: '2',
            name: 'Design Finalization',
            start: '2024-11-01',
            end: '2024-12-31',
            progress: 50,
            dependencies: '1',
            custom_class: 'in-progress'
          },
          {
            id: '3',
            name: 'Permits & Approvals',
            start: '2025-01-01',
            end: '2025-02-28',
            progress: 0,
            dependencies: '2',
            custom_class: 'pending'
          },
          {
            id: '4',
            name: 'Site Development',
            start: '2025-03-01',
            end: '2025-06-30',
            progress: 0,
            dependencies: '3',
            custom_class: 'pending'
          }
        ]
      },
      {
        id: 4,
        name: 'Metro Station Renovation',
        description: 'Complete renovation of central metro station',
        status: 'completed',
        startDate: '2023-01-01',
        endDate: '2024-06-30',
        budget: 3000000,
        actualCost: 2950000,
        location: 'Central Metro Station',
        managerId: 104,
        managerName: 'Emily Williams',
        progress: 100,
        priority: 'low',
        tasks: [
          {
            id: '1',
            name: 'Platform Upgrade',
            start: '2023-01-01',
            end: '2023-06-30',
            progress: 100,
            custom_class: 'completed'
          },
          {
            id: '2',
            name: 'Ticketing System',
            start: '2023-07-01',
            end: '2023-10-31',
            progress: 100,
            dependencies: '1',
            custom_class: 'completed'
          },
          {
            id: '3',
            name: 'Accessibility Features',
            start: '2023-11-01',
            end: '2024-02-28',
            progress: 100,
            dependencies: '2',
            custom_class: 'completed'
          },
          {
            id: '4',
            name: 'Signage & Lighting',
            start: '2024-03-01',
            end: '2024-06-30',
            progress: 100,
            dependencies: '3',
            custom_class: 'completed'
          }
        ]
      },
      {
        id: 5,
        name: 'Tech Park Phase 2',
        description: 'Expansion of technology business park',
        status: 'at-risk',
        startDate: '2024-02-01',
        endDate: '2025-08-31',
        budget: 6500000,
        actualCost: 5200000,
        location: 'Tech District',
        managerId: 105,
        managerName: 'David Brown',
        progress: 55,
        priority: 'high',
        tasks: [
          {
            id: '1',
            name: 'Infrastructure Setup',
            start: '2024-02-01',
            end: '2024-05-31',
            progress: 100,
            custom_class: 'completed'
          },
          {
            id: '2',
            name: 'Building Construction',
            start: '2024-06-01',
            end: '2024-12-31',
            progress: 70,
            dependencies: '1',
            custom_class: 'at-risk'
          },
          {
            id: '3',
            name: 'IT Infrastructure',
            start: '2025-01-01',
            end: '2025-05-31',
            progress: 20,
            dependencies: '2',
            custom_class: 'at-risk'
          },
          {
            id: '4',
            name: 'Landscaping',
            start: '2025-06-01',
            end: '2025-08-31',
            progress: 0,
            dependencies: '3',
            custom_class: 'pending'
          }
        ]
      }
    ];

    this.projectsSubject.next(mockProjects);
  }

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  getProjectById(id: number): Project | undefined {
    return this.projectsSubject.value.find(p => p.id === id);
  }

  addProject(project: Project): void {
    const projects = this.projectsSubject.value;
    const newId = Math.max(...projects.map(p => p.id), 0) + 1;
    const newProject = { ...project, id: newId, tasks: [] };
    this.projectsSubject.next([...projects, newProject]);
  }

  updateProject(updatedProject: Project): void {
    const projects = this.projectsSubject.value;
    const index = projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      projects[index] = updatedProject;
      this.projectsSubject.next([...projects]);
    }
  }

  deleteProject(id: number): void {
    const projects = this.projectsSubject.value.filter(p => p.id !== id);
    this.projectsSubject.next(projects);
  }

  getProjectTasks(projectId: number): ProjectTask[] {
    const project = this.getProjectById(projectId);
    return project?.tasks || [];
  }
}
