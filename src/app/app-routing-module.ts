import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard-module').then(m => m.DashboardModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./modules/projects/projects-module').then(m => m.ProjectsModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./modules/tasks/tasks-module').then(m => m.TasksModule)
  },
  {
    path: 'workers',
    loadChildren: () => import('./modules/workers/workers-module').then(m => m.WorkersModule)
  },
  {
    path: 'equipment',
    loadChildren: () => import('./modules/equipment/equipment-module').then(m => m.EquipmentModule)
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
