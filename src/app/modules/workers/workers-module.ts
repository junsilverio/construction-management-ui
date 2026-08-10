import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkersRoutingModule } from './workers-routing-module';
import { WorkersList } from './workers-list/workers-list';

@NgModule({
  declarations: [WorkersList],
  imports: [CommonModule, RouterModule, WorkersRoutingModule]
})
export class WorkersModule { }
