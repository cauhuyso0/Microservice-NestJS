export * from './logger.type';

export type AccessTokenPayload = {
  userId: number;
  email: string;
  verify: boolean;
  status: string;
};

export type RefreshTokenPayload = {
  userId: number;
};
