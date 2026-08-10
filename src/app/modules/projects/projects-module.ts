import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsRoutingModule } from './projects-routing-module';
import { ProjectsList } from './projects-list/projects-list';
import { ProjectDetail } from './project-detail/project-detail';
import { ProjectForm } from './project-form/project-form';

@NgModule({
  declarations: [ProjectsList, ProjectDetail, ProjectForm],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ProjectsRoutingModule]
})
export class ProjectsModule { }
