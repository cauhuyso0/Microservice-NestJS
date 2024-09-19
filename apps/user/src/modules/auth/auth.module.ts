import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { KeyTokenModule } from '../key_token/key-token.module';

@Module({
  imports: [UserModule, KeyTokenModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
