import { DynamicModule, Logger, Module } from '@nestjs/common';
import { PrismaClientService } from './prisma-user.service';
import { ConfigDB } from './type';

@Module({})
export class PrismaUserModule {
  static register(config: ConfigDB): DynamicModule {
    return {
      global: true,
      module: PrismaUserModule,
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
      module: PrismaUserModule,
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
