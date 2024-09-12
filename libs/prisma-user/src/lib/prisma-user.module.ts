import { DynamicModule, Module } from '@nestjs/common';
import { PrismaClientService } from './prisma-user.service';
import { CONFIG_PRISMA_USER } from './type';

@Module({})
export class PrismaClientUserModule {
  static register(config: CONFIG_PRISMA_USER): DynamicModule {
    return {
      module: PrismaClientService,
      providers: [
        PrismaClientService,
        {
          provide: 'CONFIG_PRISMA_USER',
          useValue: config,
        },
      ],
      exports: [PrismaClientService],
    };
  }
}
