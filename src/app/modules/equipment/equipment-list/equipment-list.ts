import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../../services/equipment';
import { ProjectService } from '../../../services/project';
import { Equipment } from '../../../models/equipment.model';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-equipment-list',
  standalone: false,
  templateUrl: './equipment-list.html',
  styleUrl: './equipment-list.scss',
})
export class EquipmentList implements OnInit {
  equipmentList: Equipment[] = [];
  projects: Project[] = [];

  constructor(
    private equipmentService: EquipmentService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.equipmentService.getEquipment().subscribe(eq => this.equipmentList = eq);
    this.projectService.getProjects().subscribe(projects => this.projects = projects);
  }

  getProjectName(projectId: number | null): string {
    if (!projectId) return '—';
    return this.projects.find(p => p.id === projectId)?.name ?? 'Unknown';
  }
}
