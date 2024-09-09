import { NestFactory } from '@nestjs/core';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { ProductModule } from './product.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ProductModule, {
    cors: true,
    logger: ['error', 'warn'],
  });

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: { retryAttempts: 5, retryDelay: 3000 },
  // });

  await app.startAllMicroservices();

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port, () => {
    console.log(`server product listen on port ${port}`);
  });
}
bootstrap();
