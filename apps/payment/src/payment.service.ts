import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MakePaymentDto } from 'apps/libs/shared/src/lib/dto/payment';
import { User } from 'apps/libs/shared/src/lib/entities';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
  ) {}

  // makePayment(makePaymentDto: MakePaymentDto) {
  //   this.authClient.emit('process_payment', JSON.stringify(makePaymentDto));
  // }

  async makePayment(makePaymentDto: MakePaymentDto) {
    const { userId, amount } = makePaymentDto;
    console.log('process payment');
    const result = await this.authClient.send(
      'get_user',
      JSON.stringify({ userId }),
    );
    return result;
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }
  getHello(): string {
    console.log('Server payment working .........');

    return 'Hello World!';
  }
}
