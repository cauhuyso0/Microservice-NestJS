import { DynamicModule, Module } from '@nestjs/common';
import { ECommerceLogger } from './ecommerce-logger.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class ECommerceLoggerModule {
  static register(appName: string): DynamicModule {
    return {
      global: true,
      module: ECommerceLoggerModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: 'LOG_SERVICE',
            imports: [ConfigModule],
            useFactory: (_configService: ConfigService) => ({
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: 'e_commerce_logger',
                  // brokers: [configService.get<string>('KAFKA_BROKER_URL')],
                  brokers: ['localhost:9092'],
                },
                consumer: {
                  groupId: 'log-consumer',
                },
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      providers: [
        ECommerceLogger,
        {
          provide: 'APP_NAME',
          useValue: appName,
        },
      ],
      exports: [ECommerceLogger],
    };
  }
}
