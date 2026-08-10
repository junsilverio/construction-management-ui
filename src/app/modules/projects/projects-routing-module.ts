import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsList } from './projects-list/projects-list';
import { ProjectDetail } from './project-detail/project-detail';
import { ProjectForm } from './project-form/project-form';

const routes: Routes = [
  { path: '', component: ProjectsList },
  { path: 'new', component: ProjectForm },
  { path: ':id', component: ProjectDetail },
  { path: ':id/edit', component: ProjectForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
