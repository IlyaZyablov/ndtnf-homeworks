import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable()
export class ParsingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((item: any) => {
        const parsedData: { status: string; data: any } = {
          status: 'temp',
          data: item,
        };
        return parsedData;
      }),
      tap((item: { status: string; data: any }) => {
        item.status = 'success';
      }),
      catchError((err) => {
        return throwError(() => {
          return { status: 'fail', data: err };
        });
      }),
    );
  }
}
