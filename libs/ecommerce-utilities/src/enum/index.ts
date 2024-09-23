export * from './route';
export * from './error-dictionary';

export enum APPS_NAME {
  USER = 'User service',
  PRODUCT = 'Product service',
  ORDER = 'Order service',
  NOTIFICATION = 'Notification service',
  PAYMENT = 'Payment service',
}

export enum E_NODE_ENV {
  DEV = 'dev',
  LOCAL = 'local',
  PRODUCTION = 'production',
  STAGING = 'staging',
}
