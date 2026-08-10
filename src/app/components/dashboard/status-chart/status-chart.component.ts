import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectStatus } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-status-chart',
  imports: [CommonModule],
  template: `
    <div class="status-chart">
      <h3>PROJECTS STATUS OVERVIEW</h3>
      <div class="chart-container">
        <svg viewBox="0 0 200 200" class="donut-chart">
          <circle cx="100" cy="100" r="70" fill="none" stroke="#E0E0E0" stroke-width="30"/>
          <circle 
            *ngFor="let item of data; let i = index"
            cx="100" 
            cy="100" 
            r="70" 
            fill="none" 
            [attr.stroke]="item.color"
            stroke-width="30"
            [attr.stroke-dasharray]="calculateDashArray(item.percentage)"
            [attr.stroke-dashoffset]="calculateDashOffset(i)"
            transform="rotate(-90 100 100)"
          />
          <text x="100" y="95" text-anchor="middle" font-size="32" font-weight="700" fill="#333">24</text>
          <text x="100" y="115" text-anchor="middle" font-size="14" fill="#666">Total Projects</text>
        </svg>
        <div class="legend">
          <div class="legend-item" *ngFor="let item of data">
            <span class="color-dot" [style.background]="item.color"></span>
            <span class="status">{{item.status}}</span>
            <span class="count">{{item.count}} ({{item.percentage}}%)</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .status-chart {
      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 1.5rem 0;
      }
      .chart-container {
        display: flex;
        align-items: center;
        gap: 2rem;
        .donut-chart {
          width: 200px;
          height: 200px;
        }
        .legend {
          flex: 1;
          .legend-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
            .color-dot {
              width: 16px;
              height: 16px;
              border-radius: 50%;
            }
            .status {
              flex: 1;
              font-weight: 600;
              color: #333;
            }
            .count {
              color: #666;
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  `]
})
export class StatusChartComponent {
  @Input() data: ProjectStatus[] = [];

  calculateDashArray(percentage: number): string {
    const circumference = 2 * Math.PI * 70;
    const filled = (percentage / 100) * circumference;
    return `${filled} ${circumference - filled}`;
  }

  calculateDashOffset(index: number): number {
    const circumference = 2 * Math.PI * 70;
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += (this.data[i].percentage / 100) * circumference;
    }
    return -offset;
  }
}
