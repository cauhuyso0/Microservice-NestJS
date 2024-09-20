import {
  IsInt,
  IsDefined,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';
import { Role } from './Role.model';

export class Permission {
  @IsDefined()
  @IsInt()
  id!: number;

  @IsDefined()
  @IsString()
  value!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

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
  roles!: Role[];
}
