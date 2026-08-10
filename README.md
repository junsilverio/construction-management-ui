# BuildPro - Construction Management UI

A comprehensive Angular-based construction management dashboard built with responsive design and real-time capabilities.

## Features

### Dashboard Overview
- **Project Overview & Key Metrics**: Display total projects, overall progress, budget, costs, open issues, and overdue tasks
- **Project Status Overview**: Interactive donut chart showing project distribution by status (On Track, At Risk, Delayed, Completed)
- **Projects Timeline**: Gantt-style timeline visualization for project scheduling
- **Recent Activities Feed**: Real-time feed of project activities and updates
- **Quick Actions**: Fast access to common operations (New Project, Create Task, Upload Document, etc.)
- **Alerts & Notifications**: Priority-based alert system for important updates
- **Weather & Site Conditions**: Current weather and forecast for construction sites
- **Budget vs Actual**: Bar chart comparing budgeted vs actual costs across projects
- **Cost Breakdown**: Pie chart showing cost distribution by category
- **Resource Utilization**: Gauge charts for labor, equipment, and materials usage
- **Documents Overview**: Quick access to project documents with counts
- **Integrations & Connectors**: Visual display of integrated third-party tools
- **My Tasks Summary**: Personal task dashboard with status breakdown
- **Project Phase Distribution**: Flow chart showing project distribution across phases

### Technical Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-Time Updates**: WebSocket service ready for live data updates
- **Modular Architecture**: Component-based structure for easy maintenance
- **Modern Angular**: Built with Angular 22 (standalone components)
- **SCSS Styling**: Organized and maintainable stylesheets
- **TypeScript**: Type-safe development experience

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 10.x or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd construction-management-ui
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/           # Dashboard widgets and charts
│   │   │   ├── metric-cards/
│   │   │   ├── status-chart/
│   │   │   ├── timeline-chart/
│   │   │   ├── activities-feed/
│   │   │   ├── quick-actions/
│   │   │   ├── alerts/
│   │   │   ├── weather/
│   │   │   ├── budget-chart/
│   │   │   ├── cost-chart/
│   │   │   ├── resource-gauge/
│   │   │   ├── documents/
│   │   │   ├── integrations/
│   │   │   ├── tasks-summary/
│   │   │   └── phase-distribution/
│   │   └── layout/              # Layout components
│   │       ├── header/
│   │       └── sidebar/
│   ├── core/
│   │   ├── models/              # Data models
│   │   └── services/            # Core services
│   │       ├── dashboard.service.ts
│   │       └── websocket.service.ts
│   ├── app.routes.ts
│   └── app.ts
├── styles.scss                   # Global styles
└── index.html
```

## Technologies Used

- **Angular 22**: Latest Angular framework with standalone components
- **TypeScript 6**: Type-safe JavaScript superset
- **SCSS**: Powerful CSS preprocessor
- **RxJS**: Reactive programming for asynchronous operations
- **Material Icons**: Icon library for UI elements
- **Inter Font**: Modern, professional typography

## Design System

### Colors
- **Primary Blue**: `#1976D2` - Headers, primary actions
- **Success Green**: `#66BB6A` - Completed items, success states
- **Warning Orange**: `#FFB300` - At-risk items, warnings
- **Error Red**: `#E53935` - Delayed items, errors
- **Info Blue**: `#42A5F5` - Informational elements
- **Purple**: `#AB47BC` - Secondary actions

### Typography
- **Font Family**: Inter, system fonts fallback
- **Heading Sizes**: 1rem - 2.5rem
- **Body Text**: 0.85rem - 1rem

### Spacing
- **Base Unit**: 0.25rem (4px)
- **Common Spacing**: 0.5rem, 1rem, 1.5rem, 2rem

## Real-Time Features

The application includes a WebSocket service placeholder for real-time updates. To connect to an actual WebSocket server, update the `websocket.service.ts` file with your server URL and connection logic.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- User authentication and authorization
- Project management CRUD operations
- Task management system
- Document management with file upload
- Advanced reporting and analytics
- Mobile native applications
- Offline mode support
- Multi-language support
- Dark mode theme

## License

This project is licensed under the MIT License.

## Version

Current version: 1.0.0
