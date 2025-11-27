export type { Asset } from './asset.model';
export type { User } from './user.model';

import { Asset } from './asset.model';
import { User } from './user.model';

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