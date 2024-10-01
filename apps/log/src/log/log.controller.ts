import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  DebugOutput,
  ErrorOutput,
  LogOutput,
  VerboseOutput,
  WarnOutput,
  EVENT_LOG,
  FatalOutput,
} from '@lib/ecommerce-utilities';
import { LogService } from './log.service';

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}

  @MessagePattern(EVENT_LOG.DEBUG)
  debug(@Payload() message: DebugOutput): void {
    this.logService.debug(message);
  }

  @MessagePattern(EVENT_LOG.ERROR)
  error(@Payload() message: ErrorOutput): void {
    this.logService.error(message);
  }

  @MessagePattern(EVENT_LOG.FATAL)
  fatal(@Payload() message: FatalOutput): void {
    this.logService.fatal(message);
  }

  @MessagePattern(EVENT_LOG.LOG)
  log(@Payload() message: LogOutput): void {
    this.logService.log(message);
  }

  @MessagePattern(EVENT_LOG.VERBOSE)
  verbose(@Payload() message: VerboseOutput): void {
    this.logService.verbose(message);
  }

  @MessagePattern(EVENT_LOG.WARN)
  warn(@Payload() message: WarnOutput): void {
    this.logService.warn(message);
  }
}
