import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksList } from './tasks-list/tasks-list';

const routes: Routes = [
  { path: '', component: TasksList }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
