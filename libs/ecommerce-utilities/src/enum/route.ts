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
}

enum ROUTE_USER__USER {
  BASE = `${APPS_CONTEXT.USER}/user`,
  SIGN_UP = `${APPS_CONTEXT.USER}/user/sign-up`,
}

enum API_TAGS {
  AUTH = 'Authentication',
  USER = 'User',
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
  },
};
