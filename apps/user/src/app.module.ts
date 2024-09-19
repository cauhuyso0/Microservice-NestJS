import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/user/.env',
      isGlobal: true,
    }),
    DatabaseModule.register(),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
