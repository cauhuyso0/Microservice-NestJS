// src/notification/main.ts
import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    NotificationModule,
    {
      cors: true,
      logger: ['error', 'warn'],
    },
  );

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: { retryAttempts: 5, retryDelay: 3000 },
  // });

  await app.startAllMicroservices();

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port, () => {
    console.log(`server notification listen on port ${port}`);
  });
}
bootstrap();
