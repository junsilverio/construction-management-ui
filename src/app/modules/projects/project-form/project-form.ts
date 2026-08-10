import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project';
import { ProjectStatus } from '../../../models/project.model';

@Component({
  selector: 'app-project-form',
  standalone: false,
  templateUrl: './project-form.html',
  styleUrl: './project-form.scss',
})
export class ProjectForm implements OnInit {
  form!: FormGroup;
  isEdit = false;
  projectId: number | null = null;

  statuses: ProjectStatus[] = ['planning', 'in-progress', 'on-hold', 'completed'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: ['planning', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
      managerId: [1]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.projectId = Number(id);
      this.projectService.getProject(this.projectId).subscribe(project => {
        if (project) {
          this.form.patchValue(project);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const value = this.form.value;
    if (this.isEdit && this.projectId !== null) {
      this.projectService.updateProject(this.projectId, value).subscribe(() => {
        this.router.navigate(['/projects', this.projectId]);
      });
    } else {
      this.projectService.createProject(value).subscribe(project => {
        this.router.navigate(['/projects', project.id]);
      });
    }
  }

  cancel(): void {
    if (this.isEdit && this.projectId !== null) {
      this.router.navigate(['/projects', this.projectId]);
    } else {
      this.router.navigate(['/projects']);
    }
  }
}
