import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project';
import { TaskService } from '../../../services/task';
import { WorkerService } from '../../../services/worker';
import { EquipmentService } from '../../../services/equipment';
import { Project } from '../../../models/project.model';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  totalProjects = 0;
  activeProjects = 0;
  totalTasks = 0;
  pendingTasks = 0;
  totalWorkers = 0;
  availableEquipment = 0;
  recentProjects: Project[] = [];
  recentTasks: Task[] = [];

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService,
    private workerService: WorkerService,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.totalProjects = projects.length;
      this.activeProjects = projects.filter(p => p.status === 'in-progress').length;
      this.recentProjects = projects.slice(0, 3);
    });
    this.taskService.getTasks().subscribe(tasks => {
      this.totalTasks = tasks.length;
      this.pendingTasks = tasks.filter(t => t.status !== 'done').length;
      this.recentTasks = tasks.slice(0, 5);
    });
    this.workerService.getWorkers().subscribe(workers => {
      this.totalWorkers = workers.length;
    });
    this.equipmentService.getEquipment().subscribe(equipment => {
      this.availableEquipment = equipment.filter(e => e.status === 'available').length;
    });
  }
}
