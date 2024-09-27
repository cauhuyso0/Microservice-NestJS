import { LoggerService, Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EVENT_LOG } from '../enum/event-log';

@Injectable()
export class ECommerceLogger implements LoggerService {
  constructor(
    @Inject('LOG_SERVICE') private readonly logClient: ClientKafka,
    @Inject('APP_NAME') private readonly appName: string,
  ) {}
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    this.logClient.emit(EVENT_LOG.LOG, {
      appName: this.appName,
      message,
      optionalParams,
    });
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, ...optionalParams: any[]) {
    this.logClient.emit(EVENT_LOG.FATAL, {
      appName: this.appName,
      message,
      optionalParams,
    });
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this.logClient.emit(EVENT_LOG.ERROR, {
      appName: this.appName,
      message,
      optionalParams,
    });
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    this.logClient.emit(EVENT_LOG.WARN, {
      appName: this.appName,
      message,
      optionalParams,
    });
  }

  /**
   * Write a 'debug' level log.
   */
  async debug(message: any, ...optionalParams: any[]) {
    console.log('hello');
    // console.log(this.logClient);
    try {
      this.logClient.send(
        EVENT_LOG.DEBUG,
        JSON.stringify({
          appName: this.appName,
          message,
          optionalParams,
        }),
      );
      console.log('success');
    } catch (error) {
      console.log('error :', error);
    }

    // console.log(data);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {
    this.logClient.emit(EVENT_LOG.LOG, {
      appName: this.appName,
      message,
      optionalParams,
    });
  }

  // async onModuleInit() {
  //   // Need to subscribe to topic
  //   // so that we can get the response from kafka microservice
  //   this.logClient.subscribeToResponseOf(EVENT_LOG.DEBUG);
  //   await this.logClient.connect();
  // }
}
