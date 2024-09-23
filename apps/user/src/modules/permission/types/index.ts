import { PermissionEntity } from '@lib/prisma-user';

export type PermissionAccessToken = Pick<
  PermissionEntity,
  'id' | 'name' | 'value'
>;
