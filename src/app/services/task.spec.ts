import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { TaskService } from './task';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tasks', async () => {
    const tasks = await firstValueFrom(service.getTasks());
    expect(tasks.length).toBeGreaterThan(0);
  });

  it('should filter tasks by project', async () => {
    const tasks = await firstValueFrom(service.getTasksByProject(1));
    tasks.forEach(t => expect(t.projectId).toBe(1));
  });
});
