import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resource } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-resource-gauge',
  imports: [CommonModule],
  template: `
    <div class="resource-gauge">
      <h3>RESOURCE UTILIZATION</h3>
      <div class="gauges">
        <div class="gauge-item" *ngFor="let resource of resources">
          <svg viewBox="0 0 120 120" class="gauge">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#E0E0E0" stroke-width="10"/>
            <circle 
              cx="60" 
              cy="60" 
              r="50" 
              fill="none" 
              [attr.stroke]="resource.color"
              stroke-width="10"
              [attr.stroke-dasharray]="calculateDashArray(resource.percentage)"
              stroke-dashoffset="0"
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="60" text-anchor="middle" font-size="24" font-weight="700" fill="#333">{{resource.percentage}}%</text>
          </svg>
          <h4>{{resource.name}}</h4>
        </div>
      </div>
      <button class="view-all">View All Resources</button>
    </div>
  `,
  styles: [`
    .resource-gauge {
      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 1.5rem 0;
      }
      .gauges {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
        .gauge-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          .gauge {
            width: 100px;
            height: 100px;
          }
          h4 {
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
export class ResourceGaugeComponent {
  @Input() resources: Resource[] = [];

  calculateDashArray(percentage: number): string {
    const circumference = 2 * Math.PI * 50;
    const filled = (percentage / 100) * circumference;
    return `${filled} ${circumference - filled}`;
  }
}
