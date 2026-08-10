import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-projects-list',
  standalone: false,
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.scss',
})
export class ProjectsList implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchTerm = '';
  statusFilter = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredProjects = this.projects.filter(p => {
      const matchesSearch = !this.searchTerm ||
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || p.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.projects = this.projects.filter(p => p.id !== id);
        this.applyFilters();
      });
    }
  }
}
