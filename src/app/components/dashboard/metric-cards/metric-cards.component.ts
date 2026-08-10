import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricCard } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-metric-cards',
  imports: [CommonModule],
  templateUrl: './metric-cards.component.html',
  styleUrls: ['./metric-cards.component.scss']
})
export class MetricCardsComponent {
  @Input() cards: MetricCard[] = [];
}
