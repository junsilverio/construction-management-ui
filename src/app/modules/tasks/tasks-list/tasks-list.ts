import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task';
import { ProjectService } from '../../../services/project';
import { Task } from '../../../models/task.model';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-tasks-list',
  standalone: false,
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksList implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  projects: Project[] = [];
  statusFilter = '';
  projectFilter = '';

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilters();
    });
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter(t => {
      const matchesStatus = !this.statusFilter || t.status === this.statusFilter;
      const matchesProject = !this.projectFilter || t.projectId === Number(this.projectFilter);
      return matchesStatus && matchesProject;
    });
  }

  getProjectName(projectId: number): string {
    return this.projects.find(p => p.id === projectId)?.name ?? 'Unknown';
  }
}
