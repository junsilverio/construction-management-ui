export type EquipmentStatus = 'available' | 'in-use' | 'maintenance';

export interface Equipment {
  id: number;
  name: string;
  type: string;
  status: EquipmentStatus;
  projectId: number | null;
  lastMaintenance: string;
}
