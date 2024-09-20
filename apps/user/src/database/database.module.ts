import { PrismaUserModule } from '@lib/prisma-user';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIGURATION } from '../utilities/enum';

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    const configService = new ConfigService();
    const dbUserName = configService.get<string>(CONFIGURATION.DB_USERNAME);
    const dbPassword = configService.get<string>(CONFIGURATION.DB_PASSWORD);
    const dbHost = configService.get<string>(CONFIGURATION.DB_HOST);
    const dbPort = configService.get<string>(CONFIGURATION.DB_PORT);
    const dbDatabase = configService.get<string>(CONFIGURATION.DB_DATABASE);
    const uri = `postgresql://${dbUserName}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`;
    return {
      global: true,
      module: DatabaseModule,
      imports: [
        PrismaUserModule.register({
          datasourceUrl: uri,
          timeReconnect: 10000,
          databaseName: 'Database Postgres User',
        }),
      ],
      exports: [PrismaUserModule],
    };
  }
}
