import { OMIT_DEFAULT } from '@apps/user/utilities';
import { User } from '@lib/prisma-user';
import { OmitType } from '@nestjs/swagger';

export class SignUpDto extends OmitType(User, [
  ...OMIT_DEFAULT,
  'verify',
  'status',
]) {}
