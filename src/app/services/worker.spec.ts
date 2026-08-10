import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { WorkerService } from './worker';

describe('WorkerService', () => {
  let service: WorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return workers', async () => {
    const workers = await firstValueFrom(service.getWorkers());
    expect(workers.length).toBeGreaterThan(0);
  });
});
