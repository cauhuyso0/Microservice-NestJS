import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/user/.env',
      isGlobal: true,
    }),
    DatabaseModule.register(),
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
