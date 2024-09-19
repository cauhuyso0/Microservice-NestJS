import { Controller, Get, Post, Body } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { MakePaymentDto } from 'apps/libs/shared/src/lib/dto/payment';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('make')
  async makePayment(@Body() makePaymentDto: MakePaymentDto) {
    return await this.paymentService.makePayment(makePaymentDto);
  }

  @Get()
  getHello(): string {
    return this.paymentService.getHello();
  }
}
