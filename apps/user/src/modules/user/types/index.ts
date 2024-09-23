export * from '@apps/user/modules/auth/types';
export * from '@apps/user/modules/key_token/types';
export * from '@apps/user/modules/user/types';

import { CreateUserDto, UserEntity } from '@lib/prisma-user';

export type SignUpInput = CreateUserDto & {
  password: string;
};

export type UserFullRelations = Omit<UserEntity, 'password'>;
