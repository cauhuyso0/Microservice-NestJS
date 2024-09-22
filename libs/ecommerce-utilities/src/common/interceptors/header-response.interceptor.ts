import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

import { Response as ExpressResponse } from 'express';

@Injectable()
export class ResponseAddDataToHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ResponseObj: ExpressResponse = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        const { accessToken, refreshToken, clientId, ...returnData } = data;
        ResponseObj.setHeader('x-access-token', accessToken);
        ResponseObj.setHeader('x-refresh-token', refreshToken);
        ResponseObj.setHeader('x-client-id', clientId);
        return {
          code: 200,
          message: 'Success',
          data: returnData,
        };
      }),
    );
  }
}
