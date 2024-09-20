import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { KeyTokenModule } from '../key_token/key-token.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, KeyTokenModule, JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
