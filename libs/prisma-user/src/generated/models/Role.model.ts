import {
  IsInt,
  IsDefined,
  IsString,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Permission } from './Permission.model';
import { User } from './User.model';

export class Role {
  @IsDefined()
  @IsInt()
  id!: number;

  @IsDefined()
  @IsString()
  name!: string;

  @IsDefined()
  @IsDate()
  createdAt!: Date;

  @IsDefined()
  @IsDate()
  updatedAt!: Date;

  @IsOptional()
  @IsDate()
  deletedAt?: Date;

  @IsDefined()
  permissions!: Permission[];

  @IsDefined()
  users!: User[];
}
