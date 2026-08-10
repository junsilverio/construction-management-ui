declare module 'frappe-gantt' {
  export interface Task {
    id: string;
    name: string;
    start: string;
    end: string;
    progress: number;
    dependencies?: string;
    custom_class?: string;
  }

  export interface GanttOptions {
    view_mode?: 'Quarter Day' | 'Half Day' | 'Day' | 'Week' | 'Month' | 'Year';
    date_format?: string;
    header_height?: number;
    column_width?: number;
    step?: number;
    bar_height?: number;
    bar_corner_radius?: number;
    arrow_curve?: number;
    padding?: number;
    view_modes?: string[];
    popup_trigger?: 'click' | 'hover';
    on_click?: (task: Task) => void;
    on_date_change?: (task: Task, start: string, end: string) => void;
    on_progress_change?: (task: Task, progress: number) => void;
  }

  export default class Gantt {
    constructor(container: HTMLElement, tasks: Task[], options?: GanttOptions);
    refresh(tasks: Task[]): void;
    change_view_mode(mode: string): void;
  }
}
