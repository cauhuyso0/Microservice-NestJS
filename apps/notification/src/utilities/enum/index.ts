export enum CONFIGURATION {
  // environment
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  // postgres prisma
  MONGO_USERNAME = 'MONGO_USERNAME',
  MONGO_PASSWORD = 'MONGO_PASSWORD',
  MONGO_DATABASE = 'MONGO_DATABASE',
  MONGO_HOST = 'MONGO_HOST',
  MONGO_PORT = 'MONGO_PORT',
  MONGO_OPTION = 'MONGO_OPTION',
  // connection string prisma
  MONGO_URL = 'MONGO_URL',

  // gRPC
  GRPC_URL = 'GRPC_URL',

  // Kafka
  KAFKA_BROKER_URL = 'KAFKA_BROKER_URL',
}

export enum E_OMIT_DEFAULT {
  _id = '_id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  deletedAt = 'deletedAt',
}

export const OMIT_DEFAULT = Object.values(E_OMIT_DEFAULT);
