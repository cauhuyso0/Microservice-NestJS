import { Prisma } from '@prisma/client';
import {
  IsInt,
  IsDefined,
  IsString,
  IsDate,
  IsOptional,
} from 'class-validator';
import './';

export class KeyToken {
  @IsDefined()
  @IsInt()
  userId!: number;

  @IsDefined()
  @IsString()
  publicKey!: string;

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
}
