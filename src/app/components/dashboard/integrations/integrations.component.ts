import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Integration } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-integrations',
  imports: [CommonModule],
  template: `
    <div class="integrations">
      <h3>INTEGRATIONS & CONNECTORS</h3>
      <div class="integration-grid">
        <div class="integration-item" *ngFor="let integration of integrations">
          <div class="integration-logo" [style.background]="integration.color">
            <span>{{getInitials(integration.name)}}</span>
          </div>
          <span class="name">{{integration.name}}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .integrations {
      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 1.5rem 0;
      }
      .integration-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        .integration-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          .integration-logo {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 1rem;
          }
          .name {
            font-size: 0.75rem;
            color: #666;
            text-align: center;
          }
        }
      }
    }
  `]
})
export class IntegrationsComponent {
  @Input() integrations: Integration[] = [];

  getInitials(name: string): string {
    return name.split(' ').map(word => word[0]).join('');
  }
}
