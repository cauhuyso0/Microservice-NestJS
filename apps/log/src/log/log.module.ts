import { Module } from '@nestjs/common';
import { LogController } from './log.controller';

@Module({
  imports: [],
  controllers: [LogController],
  providers: [],
})
export class LogModule {}
