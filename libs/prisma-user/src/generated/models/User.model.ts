import {
  IsInt,
  IsDefined,
  IsString,
  IsOptional,
  IsIn,
  IsBoolean,
  IsDate,
} from 'class-validator';
import './';
import { getEnumValues } from '../helpers';
import { UserStatus } from '../enums';

export class User {
  @IsDefined()
  @IsInt()
  id!: number;

  @IsDefined()
  @IsString()
  email!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsDefined()
  @IsIn(getEnumValues(UserStatus))
  status!: UserStatus;

  @IsDefined()
  @IsBoolean()
  verify!: boolean;

  @IsDefined()
  @IsDate()
  createdAt!: Date;

  @IsDefined()
  @IsDate()
  updatedAt!: Date;

  @IsOptional()
  @IsDate()
  deletedAt?: Date;
}
