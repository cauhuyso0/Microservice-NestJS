import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ConfigDB } from './type';
import { PrismaClientService } from './prisma-auth.service';

@Module({})
export class PrismaAuthModule {
  static register(config: ConfigDB): DynamicModule {
    return {
      global: true,
      module: PrismaAuthModule,
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
      module: PrismaAuthModule,
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
