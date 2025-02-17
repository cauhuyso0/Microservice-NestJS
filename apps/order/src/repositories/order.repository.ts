import { PrismaClientService } from '@lib/prisma-order';
import { MODEL_NAME, REPOSITORY_NAME } from '../utilities/enum';
import { BaseRepository } from './base.repository';
import { CreateOrderDto, PaginationDto } from '../utilities/order.pb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository extends BaseRepository<MODEL_NAME.ORDER> {
  constructor(prismaService: PrismaClientService) {
    super(prismaService, REPOSITORY_NAME.ORDER);
  }

  getOrderById(id: number) {
    return this.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: true,
      },
    });
  }

  getOrders(ids: number[]) {
    return this.findMany({
      where: { id: { in: ids } },
      include: { orderItems: true },
    });
  }

  paginationOrder(filter: PaginationDto) {
    return this.findMany({
      include: {
        orderItems: true,
      },
      skip: filter.skip,
      take: filter.page,
    });
  }

  createOrder(order: CreateOrderDto) {
    return this.create({
      data: {
        ...{
          amount: order.amount,
          userId: order.userId,
          orderStatusId: order.orderStatusId,
        },
        orderItems: {
          create: order.orderItems,
        },
      },
    });
  }
}
