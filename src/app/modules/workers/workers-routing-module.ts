import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkersList } from './workers-list/workers-list';

const routes: Routes = [
  { path: '', component: WorkersList }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersRoutingModule { }
