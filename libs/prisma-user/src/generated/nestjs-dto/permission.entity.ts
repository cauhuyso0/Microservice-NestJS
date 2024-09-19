import { Role } from './role.entity';

export class Permission {
  id: number;
  value: string;
  name: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  roles?: Role[];
}
