import { ECommerceLogger } from '@lib/ecommerce-utilities';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class NotificationController {
  constructor(private readonly logger: ECommerceLogger) {}

  @Get()
  getHello(): string {
    this.logger.error('sdda', 'as');
    return 'this.paymentService.getHello()';
  }
}
