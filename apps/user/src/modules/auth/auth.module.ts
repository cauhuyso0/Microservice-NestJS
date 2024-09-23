import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { KeyTokenModule } from '../key_token/key-token.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '@apps/user/common';

@Module({
  imports: [forwardRef(() => UserModule), KeyTokenModule, JwtModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
