export enum APPS_CONTEXT {
  USER = 'api-user',
  PRODUCT = 'api-product',
  ORDER = 'api-order',
  NOTIFICATION = 'api-notification',
  PAYMENT = 'api-payment',
}

enum ROUTE_USER__AUTH {
  BASE = `${APPS_CONTEXT.USER}/auth`,

  SIGN_IN = `${APPS_CONTEXT.USER}/auth/sign-in`,
  REFRESH = `${APPS_CONTEXT.USER}/auth/refresh`,
}

enum ROUTE_USER__USER {
  BASE = `${APPS_CONTEXT.USER}/user`,
  SIGN_UP = `${APPS_CONTEXT.USER}/user/sign-up`,
}

enum ROUTE_USER__PERMISSION {
  BASE = `${APPS_CONTEXT.USER}/permission`,
  BY_ID = `${APPS_CONTEXT.USER}/permission/:id([0-9]+)`,
}

enum ROUTE_USER__ROLE {
  BASE = `${APPS_CONTEXT.USER}/role`,
  BY_ID = `${APPS_CONTEXT.USER}/role/:id([0-9]+)`,
}

enum API_TAGS {
  AUTH = 'Authentication',
  USER = 'User',
  PERMISSION = 'Permission',
  ROLE = 'Role',
}

export const ROUTES = {
  USER: {
    API_DOC: `${APPS_CONTEXT.USER}/docs`,
    AUTH: {
      TAG: API_TAGS.AUTH,
      ROUTE: ROUTE_USER__AUTH,
    },
    USER: {
      TAG: API_TAGS.USER,
      ROUTE: ROUTE_USER__USER,
    },
    PERMISSION: {
      TAG: API_TAGS.PERMISSION,
      ROUTE: ROUTE_USER__PERMISSION,
    },
    ROLE: {
      TAG: API_TAGS.ROLE,
      ROUTE: ROUTE_USER__ROLE,
    },
  },
};
