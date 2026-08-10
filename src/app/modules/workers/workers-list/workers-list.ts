import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../../services/worker';
import { ProjectService } from '../../../services/project';
import { Worker } from '../../../models/worker.model';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-workers-list',
  standalone: false,
  templateUrl: './workers-list.html',
  styleUrl: './workers-list.scss',
})
export class WorkersList implements OnInit {
  workers: Worker[] = [];
  projects: Project[] = [];

  constructor(
    private workerService: WorkerService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.workerService.getWorkers().subscribe(workers => this.workers = workers);
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }

  getProjectName(projectId: number | null): string {
    if (!projectId) return '—';
    return this.projects.find(p => p.id === projectId)?.name ?? 'Unknown';
  }
}
