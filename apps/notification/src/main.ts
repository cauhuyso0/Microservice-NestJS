import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { NotificationModule } from './notification.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationModule, {
    transport: Transport.TCP,
    options: {
      port: 5000,
    },
  });
  await app.listen();
}
bootstrap();
