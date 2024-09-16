import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
// import { PrismaClientUserModule } from '@prisma-user';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/user/.env',
    }),
    // PrismaClientUserModule.register({
    //   datasourceUrl: process.env.DB_URL,
    //   timeReconnect: 1000,
    //   dbName: 'Postgres User',
    // }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
