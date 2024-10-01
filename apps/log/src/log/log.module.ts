import { Module, Logger } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
  imports: [],
  controllers: [LogController],
  providers: [LogService, Logger],
})
export class LogModule {}
