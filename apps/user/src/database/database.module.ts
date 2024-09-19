import { PrismaUserModule } from '@lib/prisma-user';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({})
export class DatabaseModule {
  static register(): DynamicModule {
    const configService = new ConfigService();
    const uri = `postgresql://${configService.get('DB_USERNAME')}:${configService.get('DB_PASSWORD')}@${configService.get('DB_HOST')}:${configService.get('DB_PORT')}/${configService.get('DB_DATABASE')}`;
    console.log('object :', uri);
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
