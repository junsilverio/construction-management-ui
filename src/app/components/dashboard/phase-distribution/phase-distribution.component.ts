import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPhase } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-phase-distribution',
  imports: [CommonModule],
  template: `
    <div class="phase-distribution">
      <h3>PROJECT PHASE DISTRIBUTION</h3>
      <div class="phase-flow">
        <div class="phase-item" *ngFor="let phase of phases; let last = last">
          <div class="phase-box">
            <h4>{{phase.phase}}</h4>
            <p>{{phase.projectCount}} Projects</p>
          </div>
          <span class="arrow material-icons" *ngIf="!last">arrow_forward</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .phase-distribution {
      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 1.5rem 0;
      }
      .phase-flow {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        overflow-x: auto;
        padding-bottom: 1rem;
        .phase-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          .phase-box {
            background: linear-gradient(135deg, #1976D2, #42A5F5);
            color: white;
            padding: 1.5rem 1rem;
            border-radius: 8px;
            text-align: center;
            min-width: 120px;
            h4 {
              font-size: 1rem;
              font-weight: 700;
              margin: 0 0 0.5rem 0;
            }
            p {
              font-size: 0.85rem;
              margin: 0;
              opacity: 0.9;
            }
          }
          .arrow {
            color: #1976D2;
            font-size: 1.5rem;
          }
        }
      }
    }
  `]
})
export class PhaseDistributionComponent {
  @Input() phases: ProjectPhase[] = [];
}
