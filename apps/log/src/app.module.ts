import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/log/.env',
    }),
    LogModule,
  ],
  controllers: [],
  providers: [],
})
export class LogAppModule {}
