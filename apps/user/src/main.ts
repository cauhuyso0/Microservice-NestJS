import { NestFactory } from '@nestjs/core';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';

import {
  APPS_NAME,
  APPS_VERSION,
  CONFIGURATION,
  configSwagger,
  ROUTES,
  HttpExceptionFilter,
  logStartApp,
  LoggingInterceptor,
} from './utilities';
import * as moment from 'moment';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'debug'],
  });

  const configService = app.get(ConfigService);

  const gRPCUrl = configService.get<string>(CONFIGURATION.GRPC_URL);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: 'proto/user.proto',
      url: gRPCUrl,
    },
  });

  await app.startAllMicroservices();

  app.use(compression());

  app.use(helmet());

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

  configSwagger(app, APPS_VERSION, APPS_NAME.USER, ROUTES.USER.API_DOC);

  await app.listen(port, async () => {
    const host = await app.getUrl();
    logStartApp({
      appName: APPS_NAME.USER,
      version: APPS_VERSION,
      host: host,
      env: nodeEnv,
      timeString: moment().format('YYYY-MM-DD HH:mm:ss'),
      apiDocsUrl: `${host}/${ROUTES.USER.API_DOC}`,
    });
  });
}
bootstrap();
