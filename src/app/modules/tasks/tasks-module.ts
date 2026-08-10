import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TasksRoutingModule } from './tasks-routing-module';
import { TasksList } from './tasks-list/tasks-list';

@NgModule({
  declarations: [TasksList],
  imports: [CommonModule, RouterModule, FormsModule, TasksRoutingModule]
})
export class TasksModule { }
