import { Prisma } from '@prisma/db-user';
import {
  IsString,
  IsDefined,
  IsInt,
  IsDate,
  IsOptional,
} from 'class-validator';
import { User } from './User.model';

export class KeyToken {
  @IsDefined()
  @IsString()
  clientId!: string;

  @IsDefined()
  @IsInt()
  userId!: number;

  @IsDefined()
  @IsString()
  publicKey!: string;

  @IsDefined()
  @IsString()
  publicKeyRefresh!: string;

  @IsDefined()
  @IsString()
  refreshToken!: string;

  @IsDefined()
  refreshTokens!: Prisma.JsonValue;

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
  user!: User;
}
