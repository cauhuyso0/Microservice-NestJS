import { CreateUserDto } from '@lib/prisma-user';

export type SignUpInput = CreateUserDto & {
  password: string;
};
