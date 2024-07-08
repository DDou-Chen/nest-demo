import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

//  可以拿到调用的 controller 和 handler
/**
 * 拦截器
 * 和middleware能拿到的参数不同
 * 它可以拿到调用的 controller 和 handler
 */
@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(context.getClass(), context.getHandler());

    const startTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log('time', Date.now() - startTime);
      }),
    );
  }
}
