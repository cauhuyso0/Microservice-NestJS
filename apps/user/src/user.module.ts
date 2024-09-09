import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/user/.env',
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
