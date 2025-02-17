import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../repositories';
import { OrderSearchService } from '../search/order-search.service';
import { CreateOrderDto, Order, PaginationDto } from '../../utilities/order.pb';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderSearchService: OrderSearchService,
  ) {}

  async createOrder(order: CreateOrderDto) {
    const newOrder = (await this.orderRepository.createOrder(order)) as Order;

    if (!newOrder) throw new Error('Bad request!');

    this.orderSearchService.indexOrder(newOrder);
    return newOrder;
  }

  async searchOrder(text: string) {
    const results = await this.orderSearchService.searchOrder(text);

    const ids = results.map((item) => item.id);

    if (!ids.length) return [];

    return this.orderRepository.getOrders(ids);
  }

  async paginationOrder(filter: PaginationDto) {
    return await this.orderRepository.paginationOrder(filter);
  }
}
