import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HttpExceptionFilter } from './filter/http-exception';
import { protobufPackage } from './utilities/auth.pb';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:3009',
        package: protobufPackage,
        protoPath: join('node_modules/grpc-nest-proto/proto/auth.proto'),
      },
    },
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.listen();
}

bootstrap();
