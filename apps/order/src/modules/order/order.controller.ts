import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../../utilities/order.pb';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() body: CreateOrderDto) {
    return this.orderService.createOrder(body);
  }

  @Get()
  async getOrders(@Query('search') search: string) {
    if (search) return this.orderService.searchOrder(search);

    return this.orderService.paginationOrder({ skip: 10, page: 10 });
  }
}
