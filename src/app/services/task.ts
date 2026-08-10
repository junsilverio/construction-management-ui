import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, projectId: 1, title: 'Foundation Inspection', description: 'Inspect concrete foundation pouring.', status: 'done', priority: 'high', assigneeId: 2, dueDate: '2025-03-01' },
    { id: 2, projectId: 1, title: 'Steel Framework', description: 'Erect steel framework floors 1-10.', status: 'in-progress', priority: 'high', assigneeId: 3, dueDate: '2025-08-15' },
    { id: 3, projectId: 1, title: 'Electrical Wiring - Floor 1', description: 'Install electrical conduits on ground floor.', status: 'todo', priority: 'medium', assigneeId: 4, dueDate: '2025-10-01' },
    { id: 4, projectId: 2, title: 'Site Survey', description: 'Complete topographic survey of riverside lot.', status: 'done', priority: 'high', assigneeId: 1, dueDate: '2026-04-10' },
    { id: 5, projectId: 2, title: 'Architectural Plans Review', description: 'Review and approve final architectural drawings.', status: 'in-progress', priority: 'medium', assigneeId: 2, dueDate: '2026-05-30' },
    { id: 6, projectId: 4, title: 'Asbestos Abatement', description: 'Remove hazardous materials before renovation.', status: 'todo', priority: 'high', assigneeId: 5, dueDate: '2025-08-01' },
  ];

  private nextId = 7;

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  getTasksByProject(projectId: number): Observable<Task[]> {
    return of(this.tasks.filter(t => t.projectId === projectId));
  }

  getTask(id: number): Observable<Task | undefined> {
    return of(this.tasks.find(t => t.id === id));
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    const newTask = { ...task, id: this.nextId++ };
    this.tasks.push(newTask);
    return of(newTask);
  }

  updateTask(id: number, task: Partial<Task>): Observable<Task | undefined> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...task };
      return of(this.tasks[index]);
    }
    return of(undefined);
  }

  deleteTask(id: number): Observable<boolean> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
