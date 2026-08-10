import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../../core/services/dashboard.service';
import { WebSocketService } from '../../core/services/websocket.service';
import {
  MetricCard,
  ProjectStatus,
  Project,
  Activity,
  Alert,
  Weather,
  BudgetData,
  CostBreakdown,
  Resource,
  Document,
  Integration,
  Task,
  ProjectPhase
} from '../../core/models/dashboard.model';
import { MetricCardsComponent } from './metric-cards/metric-cards.component';
import { StatusChartComponent } from './status-chart/status-chart.component';
import { TimelineChartComponent } from './timeline-chart/timeline-chart.component';
import { ActivitiesFeedComponent } from './activities-feed/activities-feed.component';
import { QuickActionsComponent } from './quick-actions/quick-actions.component';
import { AlertsComponent } from './alerts/alerts.component';
import { WeatherComponent } from './weather/weather.component';
import { BudgetChartComponent } from './budget-chart/budget-chart.component';
import { CostChartComponent } from './cost-chart/cost-chart.component';
import { ResourceGaugeComponent } from './resource-gauge/resource-gauge.component';
import { DocumentsComponent } from './documents/documents.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { TasksSummaryComponent } from './tasks-summary/tasks-summary.component';
import { PhaseDistributionComponent } from './phase-distribution/phase-distribution.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MetricCardsComponent,
    StatusChartComponent,
    TimelineChartComponent,
    ActivitiesFeedComponent,
    QuickActionsComponent,
    AlertsComponent,
    WeatherComponent,
    BudgetChartComponent,
    CostChartComponent,
    ResourceGaugeComponent,
    DocumentsComponent,
    IntegrationsComponent,
    TasksSummaryComponent,
    PhaseDistributionComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  metricCards: MetricCard[] = [];
  projectStatus: ProjectStatus[] = [];
  projects: Project[] = [];
  activities: Activity[] = [];
  alerts: Alert[] = [];
  weather: Weather | null = null;
  budgetData: BudgetData[] = [];
  costBreakdown: CostBreakdown[] = [];
  resources: Resource[] = [];
  documents: Document[] = [];
  integrations: Integration[] = [];
  tasks: Task[] = [];
  projectPhases: ProjectPhase[] = [];

  constructor(
    private dashboardService: DashboardService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.setupRealTimeUpdates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadDashboardData(): void {
    this.dashboardService.getMetricCards()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.metricCards = data);

    this.dashboardService.getProjectStatus()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.projectStatus = data);

    this.dashboardService.getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.projects = data);

    this.dashboardService.getRecentActivities()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.activities = data);

    this.dashboardService.getAlerts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.alerts = data);

    this.dashboardService.getWeather()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.weather = data);

    this.dashboardService.getBudgetData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.budgetData = data);

    this.dashboardService.getCostBreakdown()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.costBreakdown = data);

    this.dashboardService.getResourceUtilization()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.resources = data);

    this.dashboardService.getDocuments()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.documents = data);

    this.dashboardService.getIntegrations()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.integrations = data);

    this.dashboardService.getTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.tasks = data);

    this.dashboardService.getProjectPhases()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.projectPhases = data);
  }

  private setupRealTimeUpdates(): void {
    this.webSocketService.simulateRealTimeUpdate();
    
    this.webSocketService.getMessages()
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => {
        console.log('Real-time update received:', message);
        // Handle real-time updates here
      });
  }
}
