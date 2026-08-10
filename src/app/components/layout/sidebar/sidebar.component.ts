import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  activeProject = {
    name: 'Skyline Towers',
    type: 'Residential Complex',
    progress: 72
  };

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      label: 'Projects',
      icon: 'business',
      route: '/projects'
    },
    {
      label: 'Tasks & Schedule',
      icon: 'event',
      route: '/tasks'
    },
    {
      label: 'Resources',
      icon: 'people',
      route: '/resources'
    },
    {
      label: 'Documents',
      icon: 'description',
      route: '/documents'
    },
    {
      label: 'Budget & Costs',
      icon: 'attach_money',
      route: '/budget'
    },
    {
      label: 'Contracts',
      icon: 'gavel',
      route: '/contracts'
    },
    {
      label: 'Procurement',
      icon: 'shopping_cart',
      route: '/procurement'
    },
    {
      label: 'Site Management',
      icon: 'location_on',
      route: '/site-management'
    },
    {
      label: 'Quality & Safety',
      icon: 'verified_user',
      route: '/quality-safety'
    },
    {
      label: 'Reports & Analytics',
      icon: 'assessment',
      route: '/reports'
    }
  ];

  systemItems: MenuItem[] = [
    {
      label: 'Users & Roles',
      icon: 'people',
      route: '/users'
    },
    {
      label: 'Settings',
      icon: 'settings',
      route: '/settings'
    },
    {
      label: 'Integrations',
      icon: 'extension',
      route: '/integrations'
    },
    {
      label: 'Audit Logs',
      icon: 'history',
      route: '/audit-logs'
    }
  ];

  toggleMenuItem(item: MenuItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }

  switchProject(): void {
    console.log('Switch project');
  }
}
