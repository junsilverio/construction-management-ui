import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetData } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-budget-chart',
  imports: [CommonModule],
  template: `
    <div class="budget-chart">
      <h3>BUDGET VS ACTUAL</h3>
      <div class="chart">
        <div class="bar-group" *ngFor="let item of data">
          <div class="bars">
            <div class="bar budget" [style.height.%]="(item.budget / maxValue) * 100">
              <span class="value">\${{formatValue(item.budget)}}</span>
            </div>
            <div class="bar actual" [style.height.%]="(item.actual / maxValue) * 100">
              <span class="value">\${{formatValue(item.actual)}}</span>
            </div>
          </div>
          <span class="label">{{item.project}}</span>
        </div>
      </div>
      <div class="legend">
        <div class="legend-item">
          <span class="color-box budget"></span>
          <span>Budget</span>
        </div>
        <div class="legend-item">
          <span class="color-box actual"></span>
          <span>Actual</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .budget-chart {
      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 1.5rem 0;
      }
      .chart {
        display: flex;
        align-items: flex-end;
        gap: 1.5rem;
        height: 200px;
        margin-bottom: 1rem;
        .bar-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          .bars {
            display: flex;
            gap: 0.25rem;
            align-items: flex-end;
            height: 180px;
            .bar {
              width: 30px;
              position: relative;
              border-radius: 4px 4px 0 0;
              transition: all 0.3s;
              &.budget {
                background: #1976D2;
              }
              &.actual {
                background: #66BB6A;
              }
              .value {
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 0.7rem;
                font-weight: 600;
                white-space: nowrap;
              }
            }
          }
          .label {
            font-size: 0.75rem;
            color: #666;
            text-align: center;
          }
        }
      }
      .legend {
        display: flex;
        justify-content: center;
        gap: 2rem;
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          .color-box {
            width: 16px;
            height: 16px;
            border-radius: 4px;
            &.budget {
              background: #1976D2;
            }
            &.actual {
              background: #66BB6A;
            }
          }
          span {
            font-size: 0.85rem;
            color: #666;
          }
        }
      }
    }
  `]
})
export class BudgetChartComponent {
  @Input() data: BudgetData[] = [];

  get maxValue(): number {
    return Math.max(...this.data.map(d => Math.max(d.budget, d.actual)));
  }

  formatValue(value: number): string {
    return (value / 1000000).toFixed(1) + 'M';
  }
}
