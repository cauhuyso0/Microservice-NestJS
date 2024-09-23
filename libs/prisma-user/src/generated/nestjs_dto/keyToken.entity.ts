import { Prisma } from '@prisma/db-user';

export class KeyTokenEntity {
  clientId: string;
  userId: number;
  publicKey: string;
  publicKeyRefresh: string;
  refreshToken: string;
  refreshTokens: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
