import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-user.service';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaClientUserModule {}
