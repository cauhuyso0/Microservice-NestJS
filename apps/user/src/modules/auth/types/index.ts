import { UserEntity } from '@lib/prisma-user';

export type GenAccessTokenInput = UserEntity;
export type GenRefreshTokenInput = UserEntity;
