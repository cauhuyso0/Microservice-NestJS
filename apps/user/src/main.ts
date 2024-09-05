import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3000,
    },
    logger: ['error', 'warn'],
  });
  await app.listen();
  // const host = await app.get();
  // console.info(
  //   'Server \x1b[34m%s\x1b[0m version \x1b[34m%s\x1b[0m running at \x1b[34m%s\x1b[0m in \x1b[31m%s\x1b[0m mode!',
  //   APP_NAME,
  //   LIB_VERSION,
  //   host,
  //   nodeEnv,
  //   moment().format('YYYY-MM-DD HH:mm:ss'),
  // );
  // console.info(
  //   '\x1b[31mAPI Documents\x1b[0m is running at \x1b[34m%s\x1b[0m',
  //   `${host}/${ROUTES.API_DOCS}`,
  // );
}
bootstrap();
