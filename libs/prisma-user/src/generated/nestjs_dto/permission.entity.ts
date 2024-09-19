import { RoleEntity } from './role.entity';

export class PermissionEntity {
  id: number;
  value: string;
  name: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  roles?: RoleEntity[];
}
