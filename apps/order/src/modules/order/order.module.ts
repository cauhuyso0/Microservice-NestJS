import { forwardRef, Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from '../../repositories';
import { SearchModule } from '../search/search.module';
import { OrderSearchService } from '../search/order-search.service';

@Module({
  imports: [forwardRef(() => SearchModule)],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OrderSearchService],
  exports: [OrderService],
})
export class OrderModule {}
