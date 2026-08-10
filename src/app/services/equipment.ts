import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Equipment } from '../models/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private equipmentList: Equipment[] = [
    { id: 1, name: 'Tower Crane TC-200', type: 'Crane', status: 'in-use', projectId: 1, lastMaintenance: '2025-01-10' },
    { id: 2, name: 'Caterpillar D8 Bulldozer', type: 'Bulldozer', status: 'available', projectId: null, lastMaintenance: '2024-12-05' },
    { id: 3, name: 'Excavator EX-350', type: 'Excavator', status: 'in-use', projectId: 1, lastMaintenance: '2025-02-20' },
    { id: 4, name: 'Concrete Mixer CM-500', type: 'Mixer', status: 'maintenance', projectId: null, lastMaintenance: '2024-11-15' },
    { id: 5, name: 'Forklift FL-3T', type: 'Forklift', status: 'available', projectId: null, lastMaintenance: '2025-03-01' },
    { id: 6, name: 'Dump Truck DT-20', type: 'Truck', status: 'in-use', projectId: 2, lastMaintenance: '2025-01-25' },
  ];

  getEquipment(): Observable<Equipment[]> {
    return of(this.equipmentList);
  }

  getEquipmentItem(id: number): Observable<Equipment | undefined> {
    return of(this.equipmentList.find(e => e.id === id));
  }
}
