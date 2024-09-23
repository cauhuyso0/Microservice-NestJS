import { Prisma } from '@prisma/db-user';

export class KeyTokenEntity {
  userId: number;
  publicKey: string;
  refreshTokens: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
