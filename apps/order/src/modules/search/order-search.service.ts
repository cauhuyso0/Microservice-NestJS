import OrderSearchBody from '@apps/order/types/order-search-body.interface';
import { Order } from '@apps/order/utilities/order.pb';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class OrderSearchService {
  index = 'orders';

  constructor(private readonly elasticSearchService: ElasticsearchService) {}

  async indexOrder(order: Order) {
    return this.elasticSearchService.index<OrderSearchBody>({
      index: this.index,
      body: {
        id: order.id,
        amount: order.amount,
        orderStatusId: order.orderStatusId,
        userId: order.userId,
      },
    });
  }

  async searchOrder(text: string) {
    const results = await this.elasticSearchService.search<OrderSearchBody>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['amount', 'id', 'orderStatusId', 'userId'],
          },
        },
      },
    });

    return results.hits.hits.map((item) => item._source);
  }
}
