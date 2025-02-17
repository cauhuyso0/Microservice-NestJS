import { OrderItem } from './order-item.entity';

export class Order {
  id: number;
  amount: number;
  status: number;
  userId: number;
  orderItems: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
