import { Permission } from './permission.entity';

export class Role {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  permissions?: Permission[];
}
