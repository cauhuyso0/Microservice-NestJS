import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIGURATION } from '../utilities/enum';
import { PrismaAuthModule } from '@libs/prisma-auth';

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    const configService = new ConfigService();
    const dbUserName = configService.get<string>(CONFIGURATION.DB_USERNAME);
    const dbPassword = configService.get<string>(CONFIGURATION.DB_PASSWORD);
    const dbHost = configService.get<string>(CONFIGURATION.DB_HOST);
    const uri = `mongodb://${dbUserName}:${dbPassword}@${dbHost}/auth`;
    return {
      global: true,
      module: DatabaseModule,
      imports: [
        PrismaAuthModule.register({
          datasourceUrl: uri,
          timeReconnect: 10000,
          databaseName: 'Database MongoDB Auth',
        }),
      ],
      exports: [PrismaAuthModule],
    };
  }
}
