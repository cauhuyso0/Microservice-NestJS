export * from './route';
export * from './error-dictionary';
export * from './event-log';

export enum APPS_NAME {
  USER = 'User service',
  PRODUCT = 'Product service',
  ORDER = 'Order service',
  NOTIFICATION = 'Notification service',
  PAYMENT = 'Payment service',
  AUTH = 'Auth service',
}

export enum E_NODE_ENV {
  DEV = 'dev',
  LOCAL = 'local',
  PRODUCTION = 'production',
  STAGING = 'staging',
}
