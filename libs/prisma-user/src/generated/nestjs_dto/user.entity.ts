import { UserStatus } from '@prisma/db-user';

export class UserEntity {
  id: number;
  email: string;
  name: string | null;
  password: string | null;
  status: UserStatus;
  verify: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
