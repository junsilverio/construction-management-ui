import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-tasks-summary',
  imports: [CommonModule],
  template: `
    <div class="tasks-summary">
      <h3>MY TASKS SUMMARY</h3>
      <div class="tasks-grid">
        <div class="task-item" *ngFor="let task of tasks" [style.border-color]="task.color">
          <h2>{{task.count}}</h2>
          <p>{{task.status}}</p>
        </div>
      </div>
      <button class="view-all">View All Tasks</button>
    </div>
  `,
  styles: [`
    .tasks-summary {
      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 1.5rem 0;
      }
      .tasks-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-bottom: 1rem;
        .task-item {
          padding: 1.5rem;
          background: #F8F9FA;
          border-radius: 8px;
          border-top: 4px solid;
          text-align: center;
          h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #333;
            margin: 0 0 0.5rem 0;
          }
          p {
            font-size: 0.9rem;
            font-weight: 600;
            color: #666;
            margin: 0;
          }
        }
      }
      .view-all {
        width: 100%;
        padding: 0.75rem;
        background: #F5F5F5;
        border: none;
        border-radius: 6px;
        color: #1976D2;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: #E8EAF6;
        }
      }
    }
  `]
})
export class TasksSummaryComponent {
  @Input() tasks: Task[] = [];
}
