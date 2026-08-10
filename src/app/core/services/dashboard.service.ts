import { Injectable } from '@angular/core';
import { Observable, of, interval } from 'rxjs';
import { map } from 'rxjs/operators';
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
} from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getMetricCards(): Observable<MetricCard[]> {
    return of([
      {
        title: 'Total Projects',
        value: 24,
        subtitle: 'Active Projects',
        icon: 'business',
        color: '#4A90E2'
      },
      {
        title: 'Overall Progress',
        value: '72%',
        subtitle: '+5% from last month',
        icon: 'trending_up',
        color: '#7CB342'
      },
      {
        title: 'Total Budget',
        value: '$24.8M',
        subtitle: 'Budget Allocated',
        icon: 'attach_money',
        color: '#FFB300'
      },
      {
        title: 'Total Cost',
        value: '$18.6M',
        subtitle: '74.9% of Budget',
        icon: 'account_balance_wallet',
        color: '#AB47BC'
      },
      {
        title: 'Open Issues',
        value: 32,
        subtitle: 'Requires Attention',
        icon: 'warning',
        color: '#FF6F00'
      },
      {
        title: 'Overdue Tasks',
        value: 18,
        subtitle: 'Need Immediate Action',
        icon: 'schedule',
        color: '#42A5F5'
      }
    ]);
  }

  getProjectStatus(): Observable<ProjectStatus[]> {
    return of([
      { status: 'On Track', count: 12, percentage: 50, color: '#7CB342' },
      { status: 'At Risk', count: 6, percentage: 25, color: '#FFB300' },
      { status: 'Delayed', count: 4, percentage: 17, color: '#E53935' },
      { status: 'Completed', count: 2, percentage: 8, color: '#42A5F5' }
    ]);
  }

  getProjects(): Observable<Project[]> {
    return of([
      {
        id: '1',
        name: 'Skyline Towers',
        type: 'Residential Complex',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-12-31'),
        progress: 75,
        status: 'on-track',
        color: '#7CB342'
      },
      {
        id: '2',
        name: 'Metro Plaza',
        type: 'Commercial Building',
        startDate: new Date('2025-02-01'),
        endDate: new Date('2025-11-30'),
        progress: 60,
        status: 'at-risk',
        color: '#FFB300'
      },
      {
        id: '3',
        name: 'City Hospital',
        type: 'Healthcare Facility',
        startDate: new Date('2025-03-01'),
        endDate: new Date('2026-03-31'),
        progress: 40,
        status: 'delayed',
        color: '#FF6F00'
      },
      {
        id: '4',
        name: 'Bridge Construction',
        type: 'Infrastructure',
        startDate: new Date('2025-01-15'),
        endDate: new Date('2025-09-30'),
        progress: 85,
        status: 'delayed',
        color: '#E53935'
      },
      {
        id: '5',
        name: 'School Building',
        type: 'Education Facility',
        startDate: new Date('2025-04-01'),
        endDate: new Date('2025-12-31'),
        progress: 55,
        status: 'on-track',
        color: '#42A5F5'
      }
    ]);
  }

  getRecentActivities(): Observable<Activity[]> {
    return interval(5000).pipe(
      map(() => [
        {
          id: '1',
          icon: 'check_circle',
          color: '#7CB342',
          title: 'Concrete pour completed - Level 5',
          project: 'Skyline Towers',
          time: '2 hours ago'
        },
        {
          id: '2',
          icon: 'flash_on',
          color: '#4CAF50',
          title: 'Electrical installation in progress',
          project: 'Metro Plaza',
          time: '4 hours ago'
        },
        {
          id: '3',
          icon: 'warning',
          color: '#FFB300',
          title: 'Safety inspection conducted',
          project: 'Bridge Construction',
          time: '1 day ago'
        },
        {
          id: '4',
          icon: 'description',
          color: '#42A5F5',
          title: 'Document uploaded - Site Report',
          project: 'City Hospital',
          time: '1 day ago'
        },
        {
          id: '5',
          icon: 'check_circle',
          color: '#66BB6A',
          title: 'Task completed - Foundation work',
          project: 'School Building',
          time: '2 days ago'
        }
      ])
    );
  }

  getAlerts(): Observable<Alert[]> {
    return of([
      {
        id: '1',
        severity: 'high',
        title: 'High winds warning for construction activities',
        description: 'Skyline Towers - Today, 2:00 PM',
        time: 'Today'
      },
      {
        id: '2',
        severity: 'medium',
        title: 'Material delivery delayed',
        description: 'Metro Plaza - Today, 6:30 PM',
        time: 'Today'
      },
      {
        id: '3',
        severity: 'medium',
        title: 'Safety training required for 5 workers',
        description: 'Bridge Construction - Yesterday, 4:30 PM',
        time: 'Yesterday'
      }
    ]);
  }

  getWeather(): Observable<Weather> {
    return of({
      temperature: 25,
      condition: 'Partly Cloudy',
      humidity: 65,
      forecast: [
        { day: 'Wed', condition: 'Cloudy', temp: 26 },
        { day: 'Thu', condition: 'Sunny', temp: 24 },
        { day: 'Fri', condition: 'Rainy', temp: 22 },
        { day: 'Sat', condition: 'Sunny', temp: 23 }
      ]
    });
  }

  getBudgetData(): Observable<BudgetData[]> {
    return of([
      { project: 'Skyline Towers', budget: 10000000, actual: 7500000 },
      { project: 'Metro Plaza', budget: 8000000, actual: 5500000 },
      { project: 'City Hospital', budget: 6000000, actual: 4500000 },
      { project: 'Bridge Construction', budget: 5000000, actual: 4200000 },
      { project: 'School Building', budget: 4000000, actual: 3000000 }
    ]);
  }

  getCostBreakdown(): Observable<CostBreakdown[]> {
    return of([
      { category: 'Labor', percentage: 35.4, amount: 6586400, color: '#42A5F5' },
      { category: 'Materials', percentage: 28.7, amount: 5338200, color: '#66BB6A' },
      { category: 'Equipment', percentage: 15.3, amount: 2845800, color: '#FFA726' },
      { category: 'Subcontractors', percentage: 12.1, amount: 2250600, color: '#AB47BC' },
      { category: 'Other', percentage: 8.5, amount: 1581000, color: '#78909C' }
    ]);
  }

  getResourceUtilization(): Observable<Resource[]> {
    return of([
      { name: 'Labor', percentage: 78, color: '#42A5F5' },
      { name: 'Equipment', percentage: 65, color: '#66BB6A' },
      { name: 'Materials', percentage: 82, color: '#FFA726' }
    ]);
  }

  getDocuments(): Observable<Document[]> {
    return of([
      { type: 'Total Documents', count: 1247, icon: 'description', color: '#616161' },
      { type: 'Drawings', count: 342, icon: 'architecture', color: '#1976D2' },
      { type: 'Reports', count: 456, icon: 'assignment', color: '#7CB342' },
      { type: 'Contracts', count: 198, icon: 'gavel', color: '#AB47BC' },
      { type: 'Photos', count: 251, icon: 'photo', color: '#FFB300' }
    ]);
  }

  getIntegrations(): Observable<Integration[]> {
    return of([
      { name: 'AutoCAD', icon: 'AutoCAD', color: '#E53935' },
      { name: 'Revit', icon: 'Revit', color: '#1976D2' },
      { name: 'Primavera', icon: 'Primavera', color: '#D32F2F' },
      { name: 'Excel', icon: 'Excel', color: '#4CAF50' },
      { name: 'MS Project', icon: 'MS Project', color: '#00897B' },
      { name: 'SharePoint', icon: 'SharePoint', color: '#00ACC1' },
      { name: 'Power BI', icon: 'Power BI', color: '#F9A825' },
      { name: 'OneDrive', icon: 'OneDrive', color: '#42A5F5' }
    ]);
  }

  getTasks(): Observable<Task[]> {
    return of([
      { status: 'Pending', count: 12, color: '#FFB300' },
      { status: 'In Progress', count: 8, color: '#42A5F5' },
      { status: 'Review', count: 3, color: '#AB47BC' },
      { status: 'Completed', count: 15, color: '#66BB6A' }
    ]);
  }

  getProjectPhases(): Observable<ProjectPhase[]> {
    return of([
      { phase: 'Planning', projectCount: 4 },
      { phase: 'Design', projectCount: 6 },
      { phase: 'Procurement', projectCount: 5 },
      { phase: 'Construction', projectCount: 7 },
      { phase: 'Closeout', projectCount: 2 }
    ]);
  }
}
