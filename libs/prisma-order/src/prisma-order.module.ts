import { Module } from '@nestjs/common';
import { PrismaOrderService } from './prisma-order.service';

@Module({
  providers: [PrismaOrderService],
  exports: [PrismaOrderService],
})
export class PrismaOrderModule {}
