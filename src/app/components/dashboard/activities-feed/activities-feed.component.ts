import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Activity } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-activities-feed',
  imports: [CommonModule],
  template: `
    <div class="activities-feed">
      <h3>RECENT ACTIVITIES</h3>
      <div class="activity-item" *ngFor="let activity of activities">
        <div class="activity-icon" [style.background]="activity.color + '20'">
          <span class="material-icons" [style.color]="activity.color">{{activity.icon}}</span>
        </div>
        <div class="activity-content">
          <h4>{{activity.title}}</h4>
          <p>{{activity.project}}</p>
          <span class="time">{{activity.time}}</span>
        </div>
      </div>
      <button class="view-all">View All Activities</button>
    </div>
  `,
  styles: [`
    .activities-feed {
      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 1.5rem 0;
      }
      .activity-item {
        display: flex;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid #F0F0F0;
        &:last-child {
          border-bottom: none;
        }
        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          .material-icons {
            font-size: 1.25rem;
          }
        }
        .activity-content {
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
            margin: 0 0 0.25rem 0;
          }
          .time {
            font-size: 0.75rem;
            color: #999;
          }
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
export class ActivitiesFeedComponent {
  @Input() activities: Activity[] = [];
}
