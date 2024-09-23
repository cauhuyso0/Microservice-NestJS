import { RoleEntity } from '@lib/prisma-user';

export type RoleAccessToken = Pick<RoleEntity, 'id' | 'name'>;
