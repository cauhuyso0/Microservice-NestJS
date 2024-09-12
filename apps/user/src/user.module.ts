import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaClientUserModule } from '@prisma-user';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/user/.env',
    }),
    PrismaClientUserModule.register({
      datasourceUrl: '',
      timeReconnect: 1000,
      dbName: 'Postgres User',
    }),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
