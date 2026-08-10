import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-documents',
  imports: [CommonModule],
  template: `
    <div class="documents">
      <h3>DOCUMENTS OVERVIEW</h3>
      <div class="document-list">
        <div class="document-item" *ngFor="let doc of documents">
          <div class="doc-icon" [style.background]="doc.color + '20'">
            <span class="material-icons" [style.color]="doc.color">{{doc.icon}}</span>
          </div>
          <div class="doc-info">
            <span class="type">{{doc.type}}</span>
            <span class="count">{{doc.count}}</span>
          </div>
        </div>
      </div>
      <button class="view-all">View All Documents</button>
    </div>
  `,
  styles: [`
    .documents {
      h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #333;
        margin: 0 0 1.5rem 0;
      }
      .document-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1rem;
        .document-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: #F8F9FA;
          border-radius: 8px;
          .doc-icon {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            .material-icons {
              font-size: 1.25rem;
            }
          }
          .doc-info {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .type {
              font-size: 0.9rem;
              font-weight: 600;
              color: #333;
            }
            .count {
              font-size: 1.25rem;
              font-weight: 700;
              color: #666;
            }
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
export class DocumentsComponent {
  @Input() documents: Document[] = [];
}
