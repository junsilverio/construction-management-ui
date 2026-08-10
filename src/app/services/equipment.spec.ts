import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { EquipmentService } from './equipment';

describe('EquipmentService', () => {
  let service: EquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return equipment', async () => {
    const items = await firstValueFrom(service.getEquipment());
    expect(items.length).toBeGreaterThan(0);
  });
});
