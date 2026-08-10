import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quick-actions',
  imports: [CommonModule],
  template: `
    <div class="quick-actions">
      <h3>QUICK ACTIONS</h3>
      <div class="actions-grid">
        <button class="action-btn" *ngFor="let action of actions" [style.--action-color]="action.color">
          <span class="material-icons">{{action.icon}}</span>
          <span>{{action.label}}</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .quick-actions {
      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 1.5rem 0;
      }
      .actions-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem 1rem;
          background: #F8F9FA;
          border: 1px solid #E0E0E0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          .material-icons {
            font-size: 2rem;
            color: var(--action-color);
          }
          span:not(.material-icons) {
            font-size: 0.85rem;
            font-weight: 600;
            color: #666;
          }
          &:hover {
            background: var(--action-color);
            border-color: var(--action-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            .material-icons, span {
              color: white;
            }
          }
        }
      }
    }
  `]
})
export class QuickActionsComponent {
  actions = [
    { icon: 'business', label: 'New Project', color: '#1976D2' },
    { icon: 'check_box', label: 'Create Task', color: '#66BB6A' },
    { icon: 'upload_file', label: 'Upload Document', color: '#AB47BC' },
    { icon: 'group_add', label: 'Add Resource', color: '#FFA726' },
    { icon: 'assessment', label: 'Create Report', color: '#42A5F5' },
    { icon: 'verified_user', label: 'Site Inspection', color: '#EF5350' }
  ];
}
