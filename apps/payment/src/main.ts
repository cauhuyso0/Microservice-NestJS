import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PaymentModule, {
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });
  await app.listen();
}
bootstrap();
