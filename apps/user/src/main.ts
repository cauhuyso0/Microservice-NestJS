import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.TCP,
    options: {
      port: 3000,
    },
  });
  await app.listen();
}
bootstrap();
