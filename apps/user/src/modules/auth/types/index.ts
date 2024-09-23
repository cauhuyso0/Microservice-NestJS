import { UserEntity } from '@lib/prisma-user';

export type GenAccessTokenInput = UserEntity;

export type GenRefreshTokenInput = UserEntity;

export type ValidateAccessTokenInput = {
  clientId: string;
  userId: number;
  // accessToken: string;
};
