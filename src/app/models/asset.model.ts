export interface Asset {
  id: number;
  name: string;
  type: string;
  description: string;
  totalStock: number;
  availableStock: number;
  allocatedStock: number;
  defectiveStock: number;
  lowStockThreshold: number;
}