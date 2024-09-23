import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';

import { E_NODE_ENV } from '../../enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private env: string) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';
    console.log(exception);

    console.log('object :', message);
    response.status(status).json({
      statusCode: status,
      message,
      error:
        this.env !== E_NODE_ENV.PRODUCTION
          ? {
              message: exception.message,
              stack: exception.stack,
            }
          : null,
    });
  }
}
