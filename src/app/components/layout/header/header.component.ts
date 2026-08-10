import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  notificationCount = 2;
  messageCount = 3;
  userName = 'John Project Manager';
  userRole = 'Project Manager';

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    console.log('Search:', value);
  }

  openNotifications(): void {
    console.log('Opening notifications');
  }

  openMessages(): void {
    console.log('Opening messages');
  }

  openHelp(): void {
    console.log('Opening help');
  }

  openProfile(): void {
    console.log('Opening profile');
  }
}
