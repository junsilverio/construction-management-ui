import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostBreakdown } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-cost-chart',
  imports: [CommonModule],
  template: `
    <div class="cost-chart">
      <h3>COST BREAKDOWN</h3>
      <div class="chart-container">
        <svg viewBox="0 0 200 200" class="pie-chart">
          <circle 
            *ngFor="let item of data; let i = index"
            cx="100" 
            cy="100" 
            r="80" 
            fill="none" 
            [attr.stroke]="item.color"
            stroke-width="40"
            [attr.stroke-dasharray]="calculateDashArray(item.percentage)"
            [attr.stroke-dashoffset]="calculateDashOffset(i)"
            transform="rotate(-90 100 100)"
          />
          <text x="100" y="95" text-anchor="middle" font-size="28" font-weight="700" fill="#333">\$18.6M</text>
          <text x="100" y="115" text-anchor="middle" font-size="12" fill="#666">Total Cost</text>
        </svg>
        <div class="legend">
          <div class="legend-item" *ngFor="let item of data">
            <span class="color-dot" [style.background]="item.color"></span>
            <div class="item-info">
              <span class="category">{{item.category}}</span>
              <span class="percentage">{{item.percentage}}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cost-chart {
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
        .pie-chart {
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
              flex-shrink: 0;
            }
            .item-info {
              display: flex;
              justify-content: space-between;
              flex: 1;
              .category {
                font-weight: 600;
                color: #333;
              }
              .percentage {
                color: #666;
                font-size: 0.9rem;
              }
            }
          }
        }
      }
    }
  `]
})
export class CostChartComponent {
  @Input() data: CostBreakdown[] = [];

  calculateDashArray(percentage: number): string {
    const circumference = 2 * Math.PI * 80;
    const filled = (percentage / 100) * circumference;
    return `${filled} ${circumference - filled}`;
  }

  calculateDashOffset(index: number): number {
    const circumference = 2 * Math.PI * 80;
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += (this.data[i].percentage / 100) * circumference;
    }
    return -offset;
  }
}
