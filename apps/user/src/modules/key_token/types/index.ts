import { CreateKeyTokenDto, KeyTokenEntity } from '@lib/prisma-user';

export type KeyToken = KeyTokenEntity;

export type GetPublicKeyInput = Pick<KeyToken, 'clientId' | 'userId'>;
export type GetPublicKeyRefreshInput = Pick<
  KeyToken,
  'clientId' | 'userId' | 'refreshToken'
>;

export type CreateWhenSignInInput = CreateKeyTokenDto;
export type UpdateWhenRefreshAccessTokenInput = Pick<
  KeyToken,
  'clientId' | 'publicKey'
>;
