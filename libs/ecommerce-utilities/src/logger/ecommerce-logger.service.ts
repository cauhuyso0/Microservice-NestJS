import { Logger, Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EVENT_LOG } from '../enum/event-log';

@Injectable()
export class ECommerceLogger extends Logger {
  constructor(
    @Inject('LOG_SERVICE') private readonly logClient: ClientKafka,
    @Inject('APP_NAME') private readonly appName: string,
  ) {
    super();
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any, context?: string) {
    this.logClient.emit(
      EVENT_LOG.LOG,
      JSON.stringify({ appName: this.appName, message, context }),
    );
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, context?: string) {
    this.logClient.emit(
      EVENT_LOG.FATAL,
      JSON.stringify({ appName: this.appName, message, context }),
    );
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, trace?: string, context?: string) {
    this.logClient.emit(
      EVENT_LOG.ERROR,
      JSON.stringify({ appName: this.appName, message, trace, context }),
    );
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, context?: string) {
    this.logClient.emit(
      EVENT_LOG.WARN,
      JSON.stringify({ appName: this.appName, message, context }),
    );
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, context?: string) {
    this.logClient.emit(
      EVENT_LOG.DEBUG,
      JSON.stringify({
        appName: this.appName,
        message,
        context,
      }),
    );
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, context?: string) {
    this.logClient.emit(
      EVENT_LOG.LOG,
      JSON.stringify({ appName: this.appName, message, context }),
    );
  }
}
