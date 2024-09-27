import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  APPS_NAME,
  APPS_VERSION,
  CONFIGURATION,
  HttpExceptionFilter,
  LoggingInterceptor,
  logStartApp,
  ROUTES,
} from '@apps/notification/utilities';
import { ValidationPipe } from '@nestjs/common';
import * as moment from 'moment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['error', 'warn'],
  });

  const configService = app.get(ConfigService);

  const gRPCUrl = configService.get<string>(CONFIGURATION.GRPC_URL);
  // const kafkaBrokerUrl = configService.get<string>(
  //   CONFIGURATION.KAFKA_BROKER_URL,
  // );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'notification',
      protoPath: 'proto/notification.proto',
      url: gRPCUrl,
    },
  });

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: 'notification-service',
  //       brokers: [kafkaBrokerUrl],
  //     },
  //     consumer: {
  //       groupId: 'mail-consumer',
  //     },
  //   },
  // });

  await app.startAllMicroservices();

  const port = configService.get<string>(CONFIGURATION.PORT);
  const nodeEnv = configService.get<string>(CONFIGURATION.NODE_ENV);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter(nodeEnv));

  await app.listen(port, async () => {
    const host = await app.getUrl();
    logStartApp({
      appName: APPS_NAME.NOTIFICATION,
      version: APPS_VERSION,
      host: host,
      env: nodeEnv,
      timeString: moment().format('YYYY-MM-DD HH:mm:ss'),
      apiDocsUrl: `${host}/${ROUTES.NOTIFICATION.API_DOC}`,
    });
  });
}
bootstrap();
