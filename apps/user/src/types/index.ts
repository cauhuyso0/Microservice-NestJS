export * from '@apps/user/modules/auth/types';
export * from '@apps/user/modules/user/types';
export * from '@apps/user/modules/key_token/types';
export * from '@apps/user/modules/role/types';
export * from '@apps/user/modules/permission/types';

import { PermissionAccessToken } from '@apps/user/modules/permission/types';
import { RoleAccessToken } from '@apps/user/modules/role/types';

export type AccessTokenPayload = {
  userId: number;
  email: string;
  verify: boolean;
  status: string;
  roles: RoleAccessToken[];
  permissions: PermissionAccessToken[];
};

export type RefreshTokenPayload = {
  userId: number;
};
