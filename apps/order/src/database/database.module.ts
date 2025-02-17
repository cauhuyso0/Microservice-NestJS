import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIGURATION } from '../utilities';
import { PrismaOrderModule } from '@lib/prisma-order';

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    const configService = new ConfigService();
    const dbUserName = configService.get<string>(CONFIGURATION.DB_USERNAME);
    const dbPassword = configService.get<string>(CONFIGURATION.DB_PASSWORD);
    const dbHost = configService.get<string>(CONFIGURATION.DB_HOST);
    const dbDatabase = configService.get<string>(CONFIGURATION.DB_DATABASE);
    const uri = `mysql://${dbUserName}:${dbPassword}@${dbHost}/${dbDatabase}`;
    return {
      global: true,
      module: DatabaseModule,
      imports: [
        PrismaOrderModule.register({
          datasourceUrl: uri,
          timeReconnect: 10000,
          databaseName: 'Database Mysql Order',
        }),
      ],
      exports: [PrismaOrderModule],
    };
  }
}
