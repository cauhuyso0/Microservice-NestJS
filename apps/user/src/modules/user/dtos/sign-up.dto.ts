import { OMIT_DEFAULT } from '@apps/user/utilities';
import { UserDto } from '@lib/prisma-user';
import { OmitType } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class SignUpDto extends OmitType(UserDto, [
  ...OMIT_DEFAULT,
  'verify',
  'status',
]) {
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}
