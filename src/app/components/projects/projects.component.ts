import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Subject, takeUntil } from 'rxjs';
import Gantt from 'frappe-gantt';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ProjectsService } from '../../services/projects.service';
import { Project, ProjectTask } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, AgGridAngular, FormsModule, ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  @ViewChild('ganttContainer', { static: false }) ganttContainer?: ElementRef;
  
  private destroy$ = new Subject<void>();
  private ganttInstance?: Gantt;
  
  projects: Project[] = [];
  selectedProject: Project | null = null;
  showAddEditDialog = false;
  showDeleteDialog = false;
  isEditMode = false;
  projectForm: FormGroup;
  projectToDelete: Project | null = null;

  // AG Grid configuration
  columnDefs: ColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 80, 
      sortable: true,
      filter: true,
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    { 
      field: 'name', 
      headerName: 'Project Name', 
      flex: 2, 
      sortable: true,
      filter: true,
      cellStyle: { fontWeight: '500' }
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => {
        const statusColors: any = {
          'planning': '#FFA726',
          'in-progress': '#42A5F5',
          'on-hold': '#FFA726',
          'completed': '#66BB6A',
          'at-risk': '#FFB300',
          'delayed': '#E53935'
        };
        const color = statusColors[params.value] || '#999';
        return `<span style="display: inline-block; padding: 4px 12px; border-radius: 12px; background: ${color}20; color: ${color}; font-size: 0.8rem; font-weight: 600;">${params.value?.toUpperCase()}</span>`;
      }
    },
    { 
      field: 'priority', 
      headerName: 'Priority', 
      width: 110,
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => {
        const priorityColors: any = {
          'low': '#66BB6A',
          'medium': '#FFB300',
          'high': '#FF7043',
          'critical': '#E53935'
        };
        const color = priorityColors[params.value] || '#999';
        return `<span style="color: ${color}; font-weight: 600; text-transform: capitalize;">${params.value || 'N/A'}</span>`;
      }
    },
    { 
      field: 'progress', 
      headerName: 'Progress', 
      width: 120,
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => {
        const progress = params.value || 0;
        const color = progress >= 75 ? '#66BB6A' : progress >= 50 ? '#42A5F5' : progress >= 25 ? '#FFB300' : '#E53935';
        return `
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="flex: 1; height: 6px; background: #E0E0E0; border-radius: 3px; overflow: hidden;">
              <div style="height: 100%; width: ${progress}%; background: ${color};"></div>
            </div>
            <span style="font-size: 0.8rem; font-weight: 600; color: ${color};">${progress}%</span>
          </div>
        `;
      }
    },
    { 
      field: 'managerName', 
      headerName: 'Manager', 
      flex: 1,
      sortable: true,
      filter: true
    },
    { 
      field: 'location', 
      headerName: 'Location', 
      flex: 1.5,
      sortable: true,
      filter: true
    },
    { 
      field: 'startDate', 
      headerName: 'Start Date', 
      width: 120,
      sortable: true,
      filter: true,
      valueFormatter: (params: any) => this.formatDate(params.value)
    },
    { 
      field: 'endDate', 
      headerName: 'End Date', 
      width: 120,
      sortable: true,
      filter: true,
      valueFormatter: (params: any) => this.formatDate(params.value)
    },
    { 
      field: 'budget', 
      headerName: 'Budget', 
      width: 130,
      sortable: true,
      filter: true,
      valueFormatter: (params: any) => this.formatCurrency(params.value)
    },
    { 
      field: 'actualCost', 
      headerName: 'Actual Cost', 
      width: 130,
      sortable: true,
      filter: true,
      valueFormatter: (params: any) => this.formatCurrency(params.value)
    }
  ];

  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    filter: true
  };

  constructor(
    private projectsService: ProjectsService,
    private fb: FormBuilder
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['planning', Validators.required],
      priority: ['medium', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(0)]],
      actualCost: [0, Validators.min(0)],
      location: ['', Validators.required],
      managerName: ['', Validators.required],
      progress: [0, [Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProjects(): void {
    this.projectsService.getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe(projects => {
        this.projects = projects;
      });
  }

  onGridReady(params: GridReadyEvent): void {
    params.api.sizeColumnsToFit();
  }

  onSelectionChanged(event: SelectionChangedEvent): void {
    const selectedRows = event.api.getSelectedRows();
    if (selectedRows.length > 0) {
      this.selectedProject = selectedRows[0];
      this.renderGanttChart();
    } else {
      this.selectedProject = null;
      this.clearGanttChart();
    }
  }

  renderGanttChart(): void {
    if (!this.selectedProject || !this.ganttContainer) {
      return;
    }

    setTimeout(() => {
      const tasks = this.selectedProject?.tasks || [];
      
      if (tasks.length === 0) {
        this.clearGanttChart();
        return;
      }

      try {
        if (this.ganttInstance) {
          this.ganttInstance.refresh(tasks);
        } else {
          this.ganttInstance = new Gantt(this.ganttContainer!.nativeElement, tasks, {
            view_mode: 'Month',
            date_format: 'YYYY-MM-DD',
            header_height: 50,
            column_width: 30,
            step: 24,
            bar_height: 20,
            bar_corner_radius: 3,
            arrow_curve: 5,
            padding: 18,
            view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
            popup_trigger: 'click',
            on_click: (task: ProjectTask) => {
              console.log('Task clicked:', task);
            },
            on_date_change: (task: ProjectTask, start: string, end: string) => {
              console.log('Task dates changed:', task, start, end);
            },
            on_progress_change: (task: ProjectTask, progress: number) => {
              console.log('Task progress changed:', task, progress);
            }
          });
        }
      } catch (error) {
        console.error('Error rendering Gantt chart:', error);
      }
    }, 100);
  }

  clearGanttChart(): void {
    if (this.ganttContainer) {
      this.ganttContainer.nativeElement.innerHTML = '';
      this.ganttInstance = undefined;
    }
  }

  openAddDialog(): void {
    this.isEditMode = false;
    this.projectForm.reset({
      status: 'planning',
      priority: 'medium',
      progress: 0,
      actualCost: 0
    });
    this.showAddEditDialog = true;
  }

  openEditDialog(project: Project): void {
    this.isEditMode = true;
    this.projectForm.patchValue({
      name: project.name,
      description: project.description,
      status: project.status,
      priority: project.priority,
      startDate: project.startDate,
      endDate: project.endDate,
      budget: project.budget,
      actualCost: project.actualCost,
      location: project.location,
      managerName: project.managerName,
      progress: project.progress
    });
    this.selectedProject = project;
    this.showAddEditDialog = true;
  }

  saveProject(): void {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;
      
      if (this.isEditMode && this.selectedProject) {
        const updatedProject: Project = {
          ...this.selectedProject,
          ...formValue,
          managerId: this.selectedProject.managerId
        };
        this.projectsService.updateProject(updatedProject);
      } else {
        const newProject: Project = {
          id: 0,
          ...formValue,
          managerId: Math.floor(Math.random() * 1000) + 100,
          tasks: []
        };
        this.projectsService.addProject(newProject);
      }
      
      this.closeAddEditDialog();
    }
  }

  closeAddEditDialog(): void {
    this.showAddEditDialog = false;
    this.projectForm.reset();
    this.selectedProject = null;
  }

  openDeleteDialog(project: Project): void {
    this.projectToDelete = project;
    this.showDeleteDialog = true;
  }

  confirmDelete(): void {
    if (this.projectToDelete) {
      this.projectsService.deleteProject(this.projectToDelete.id);
      this.closeDeleteDialog();
    }
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.projectToDelete = null;
  }

  exportToExcel(): void {
    const exportData = this.projects.map(p => ({
      'ID': p.id,
      'Project Name': p.name,
      'Description': p.description,
      'Status': p.status,
      'Priority': p.priority,
      'Progress': `${p.progress}%`,
      'Manager': p.managerName,
      'Location': p.location,
      'Start Date': p.startDate,
      'End Date': p.endDate,
      'Budget': p.budget,
      'Actual Cost': p.actualCost
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Projects');
    
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `projects_${new Date().toISOString().split('T')[0]}.xlsx`);
  }

  exportToMSProject(): void {
    if (!this.selectedProject) {
      alert('Please select a project to export');
      return;
    }

    const xml = this.generateMSProjectXML(this.selectedProject);
    const blob = new Blob([xml], { type: 'application/xml' });
    saveAs(blob, `${this.selectedProject.name.replace(/\s+/g, '_')}.xml`);
  }

  private generateMSProjectXML(project: Project): string {
    const tasks = project.tasks || [];
    
    let tasksXML = '';
    tasks.forEach((task, index) => {
      tasksXML += `
    <Task>
      <UID>${index + 1}</UID>
      <ID>${index + 1}</ID>
      <Name>${this.escapeXML(task.name)}</Name>
      <Start>${task.start}T08:00:00</Start>
      <Finish>${task.end}T17:00:00</Finish>
      <PercentComplete>${task.progress}</PercentComplete>
      <Priority>500</Priority>
    </Task>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<Project xmlns="http://schemas.microsoft.com/project">
  <Name>${this.escapeXML(project.name)}</Name>
  <Title>${this.escapeXML(project.name)}</Title>
  <StartDate>${project.startDate}T08:00:00</StartDate>
  <FinishDate>${project.endDate}T17:00:00</FinishDate>
  <Tasks>${tasksXML}
  </Tasks>
</Project>`;
  }

  private escapeXML(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  printProjects(): void {
    window.print();
  }

  private formatDate(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  private formatCurrency(value: number): string {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  changeGanttView(viewMode: string): void {
    if (this.ganttInstance) {
      this.ganttInstance.change_view_mode(viewMode);
    }
  }
}
