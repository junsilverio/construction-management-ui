import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-timeline-chart',
  imports: [CommonModule],
  template: `
    <div class="timeline-chart">
      <h3>PROJECTS TIMELINE</h3>
      <div class="timeline-header">
        <div class="project-col">Project Name</div>
        <div class="date-col">May 2025</div>
        <div class="date-col">Jun 2025</div>
        <div class="date-col">Jul 2025</div>
        <div class="date-col">Aug 2025</div>
      </div>
      <div class="timeline-row" *ngFor="let project of projects">
        <div class="project-info">
          <h4>{{project.name}}</h4>
          <p>{{project.type}}</p>
        </div>
        <div class="timeline-bar">
          <div class="bar" [style.width.%]="project.progress" [style.background]="project.color"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .timeline-chart {
      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 1.5rem 0;
      }
      .timeline-header {
        display: grid;
        grid-template-columns: 200px repeat(4, 1fr);
        gap: 0.5rem;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #E0E0E0;
        .project-col, .date-col {
          font-weight: 600;
          color: #666;
          font-size: 0.85rem;
        }
      }
      .timeline-row {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
        align-items: center;
        .project-info {
          h4 {
            font-size: 0.95rem;
            font-weight: 600;
            color: #333;
            margin: 0 0 0.25rem 0;
          }
          p {
            font-size: 0.8rem;
            color: #666;
            margin: 0;
          }
        }
        .timeline-bar {
          height: 24px;
          background: #F5F5F5;
          border-radius: 4px;
          overflow: hidden;
          .bar {
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s;
          }
        }
      }
    }
  `]
})
export class TimelineChartComponent {
  @Input() projects: Project[] = [];
}
