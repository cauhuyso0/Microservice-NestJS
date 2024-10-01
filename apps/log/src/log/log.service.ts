import {
  DebugOutput,
  ErrorOutput,
  FatalOutput,
  LogOutput,
  VerboseOutput,
  WarnOutput,
} from '@lib/ecommerce-utilities';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LogService {
  constructor(private readonly logger: Logger) {}

  debug(params: DebugOutput) {
    this.logger.debug(
      {
        ...params.message,
        appName: params.appName,
      },
      params.context,
    );
  }

  error(params: ErrorOutput) {
    if (typeof params.message === 'string') {
      params.message = {
        message: params.message,
      };
    }
    this.logger.error(
      {
        ...params.message,
        appName: params.appName,
      },
      params.trace,
      // params.context,
    );
  }

  fatal(params: FatalOutput) {
    this.logger.fatal(
      {
        ...params.message,
        appName: params.appName,
      },
      params.context,
    );
  }

  log(params: LogOutput) {
    this.logger.log(
      {
        ...params.message,
        appName: params.appName,
      },
      params.context,
    );
  }

  verbose(params: VerboseOutput) {
    this.logger.verbose(
      {
        ...params.message,
        appName: params.appName,
      },
      params.context,
    );
  }

  warn(params: WarnOutput) {
    this.logger.warn(
      {
        ...params.message,
        appName: params.appName,
      },
      params.context,
    );
  }
}
