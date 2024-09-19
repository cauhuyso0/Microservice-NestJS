import { NestFactory } from '@nestjs/core';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import {
  APPS_NAME,
  APPS_VERSION,
  CONFIGURATION,
  configSwagger,
  ROUTES,
} from './utilities';
import * as moment from 'moment';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['error', 'warn'],
  });

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: { retryAttempts: 5, retryDelay: 3000 },
  // });

  await app.startAllMicroservices();

  const configService = app.get(ConfigService);
  const port = configService.get<string>(CONFIGURATION.PORT);
  const nodeEnv = configService.get<string>(CONFIGURATION.NODE_ENV);

  configSwagger(app, APPS_VERSION, APPS_NAME.USER, ROUTES.USER.API_DOC);

  await app.listen(port, async () => {
    const host = await app.getUrl();
    console.info(
      'Server \x1b[34m%s\x1b[0m version \x1b[34m%s\x1b[0m running at \x1b[34m%s\x1b[0m in \x1b[31m%s\x1b[0m mode!',
      APPS_NAME.USER,
      APPS_VERSION,
      host,
      nodeEnv,
      moment().format('YYYY-MM-DD HH:mm:ss'),
    );
    console.info(
      '\x1b[31mAPI Documents\x1b[0m is running at \x1b[34m%s\x1b[0m',
      `${host}/${ROUTES.USER.API_DOC}`,
    );
  });
}
bootstrap();
