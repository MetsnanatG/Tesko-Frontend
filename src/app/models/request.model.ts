export interface Request {
  id: number;
  purpose: string;
  quantity: number;
  status: string;
  userId: number;
  user?: User;
  assetId: number;
  asset?: Asset;
  requestDate: Date;
  actionDate?: Date;
  comment?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Asset {
  id: number;
  name: string;
  description: string;
  category: string;
  status: string;
  location: string;
}