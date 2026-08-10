import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ProjectService } from './project';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return projects', async () => {
    const projects = await firstValueFrom(service.getProjects());
    expect(projects.length).toBeGreaterThan(0);
  });

  it('should create a project', async () => {
    const p = await firstValueFrom(service.createProject({
      name: 'Test', description: '', status: 'planning',
      startDate: '2026-01-01', endDate: '2026-12-31',
      budget: 1000, location: 'Test City', managerId: 1
    }));
    expect(p.id).toBeDefined();
    expect(p.name).toBe('Test');
  });
});
