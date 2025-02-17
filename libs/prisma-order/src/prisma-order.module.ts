import { DynamicModule, Logger, Module } from '@nestjs/common';
import { PrismaClientService } from './prisma-order.service';
import { ConfigDB } from './type';

@Module({})
export class PrismaOrderModule {
  static register(config: ConfigDB): DynamicModule {
    return {
      global: true,
      module: PrismaOrderModule,
      providers: [
        PrismaClientService,
        {
          provide: 'CONFIG_DB',
          useValue: config,
        },
        Logger,
      ],
      exports: [PrismaClientService],
    };
  }

  static forRoot(config: ConfigDB): DynamicModule {
    return {
      global: true,
      module: PrismaOrderModule,
      providers: [
        PrismaClientService,
        {
          provide: 'CONFIG_DB',
          useValue: config,
        },
        Logger,
      ],
      exports: [PrismaClientService],
    };
  }
}
