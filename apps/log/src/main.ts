import { NestFactory } from '@nestjs/core';
import { LogAppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LoggerFactory } from './log/log.factory';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    LogAppModule,
    {
      logger: LoggerFactory('MyApp'),
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'log-consumer',
          sessionTimeout: 60000,
          heartbeatInterval: 40000,
          maxWaitTimeInMs: 43000,
          retry: { retries: 30 },
        },
      },
    },
  );

  await app.listen();

  console.log('Kafka consumer service is listening!');
}
bootstrap();
