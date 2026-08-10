import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Worker } from '../models/worker.model';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private workers: Worker[] = [
    { id: 1, name: 'Alice Johnson', role: 'Project Manager', phone: '555-0101', email: 'alice@constructco.com', projectId: 1, available: false },
    { id: 2, name: 'Bob Martinez', role: 'Civil Engineer', phone: '555-0102', email: 'bob@constructco.com', projectId: 1, available: false },
    { id: 3, name: 'Carol Williams', role: 'Structural Engineer', phone: '555-0103', email: 'carol@constructco.com', projectId: 1, available: false },
    { id: 4, name: 'David Lee', role: 'Electrician', phone: '555-0104', email: 'david@constructco.com', projectId: null, available: true },
    { id: 5, name: 'Eva Chen', role: 'Safety Inspector', phone: '555-0105', email: 'eva@constructco.com', projectId: 4, available: false },
    { id: 6, name: 'Frank Brown', role: 'Heavy Equipment Operator', phone: '555-0106', email: 'frank@constructco.com', projectId: null, available: true },
  ];

  getWorkers(): Observable<Worker[]> {
    return of(this.workers);
  }

  getWorker(id: number): Observable<Worker | undefined> {
    return of(this.workers.find(w => w.id === id));
  }
}
