import { PermissionEntity } from './permission.entity';

export class RoleEntity {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  permissions?: PermissionEntity[];
}
