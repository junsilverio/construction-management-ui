import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alert } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-alerts',
  imports: [CommonModule],
  template: `
    <div class="alerts">
      <h3>ALERTS & NOTIFICATIONS</h3>
      <div class="alert-item" *ngFor="let alert of alerts" [class]="'severity-' + alert.severity">
        <span class="material-icons">warning</span>
        <div class="alert-content">
          <h4>{{alert.title}}</h4>
          <p>{{alert.description}}</p>
        </div>
        <span class="severity-badge">{{alert.severity}}</span>
      </div>
      <button class="view-all">View All Alerts</button>
    </div>
  `,
  styles: [`
    .alerts {
      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 1.5rem 0;
      }
      .alert-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        &.severity-high {
          background: #FFEBEE;
          .material-icons { color: #E53935; }
          .severity-badge { background: #E53935; }
        }
        &.severity-medium {
          background: #FFF8E1;
          .material-icons { color: #FFB300; }
          .severity-badge { background: #FFB300; }
        }
        &.severity-low {
          background: #E8F5E9;
          .material-icons { color: #66BB6A; }
          .severity-badge { background: #66BB6A; }
        }
        .material-icons {
          font-size: 1.5rem;
        }
        .alert-content {
          flex: 1;
          h4 {
            font-size: 0.95rem;
            font-weight: 600;
            color: #333;
            margin: 0 0 0.25rem 0;
          }
          p {
            font-size: 0.85rem;
            color: #666;
            margin: 0;
          }
        }
        .severity-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
        }
      }
      .view-all {
        width: 100%;
        padding: 0.75rem;
        margin-top: 1rem;
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
export class AlertsComponent {
  @Input() alerts: Alert[] = [];
}
