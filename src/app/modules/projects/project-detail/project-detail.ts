import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../services/project';
import { TaskService } from '../../../services/task';
import { Project } from '../../../models/project.model';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-project-detail',
  standalone: false,
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail implements OnInit {
  project: Project | undefined;
  tasks: Task[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getProject(id).subscribe(project => {
      this.project = project;
    });
    this.taskService.getTasksByProject(id).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  deleteProject(): void {
    if (this.project && confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(this.project.id).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }
}
