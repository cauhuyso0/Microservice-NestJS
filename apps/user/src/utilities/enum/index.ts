export * from './model-name';

export enum CONFIGURATION {
  // environment
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  // mysql prisma
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_DATABASE = 'DB_DATABASE',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_OPTION = 'DB_OPTION',
  // connection string prisma
  DB_URL = 'DB_URL',
}

export enum E_OMIT_DEFAULT {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  deletedAt = 'deletedAt',
}

export const OMIT_DEFAULT = Object.values(E_OMIT_DEFAULT);
