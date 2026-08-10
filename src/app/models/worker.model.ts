export interface Worker {
  id: number;
  name: string;
  role: string;
  phone: string;
  email: string;
  projectId: number | null;
  available: boolean;
}
