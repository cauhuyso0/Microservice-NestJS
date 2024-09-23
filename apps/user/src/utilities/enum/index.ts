export * from './model-name';
export * from './repository-name';

export enum CONFIGURATION {
  // environment
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  // postgres prisma
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_DATABASE = 'DB_DATABASE',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_OPTION = 'DB_OPTION',
  // connection string prisma
  DB_URL = 'DB_URL',

  // Authentication
  JWT_ACCESS_TOKEN_TIME_TO_LIVE = 'JWT_ACCESS_TOKEN_TIME_TO_LIVE',
  JWT_REFRESH_TOKEN_TIME_TO_LIVE = 'JWT_REFRESH_TOKEN_TIME_TO_LIVE',
}

export enum E_OMIT_DEFAULT {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  deletedAt = 'deletedAt',
}

export const OMIT_DEFAULT = Object.values(E_OMIT_DEFAULT);
