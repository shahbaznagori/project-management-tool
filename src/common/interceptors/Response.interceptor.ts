import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (data) {
          // Remove sensitive info
          if (data?.password) delete data.password;

          // Return consistent response
          return {
            success: true,
            status: HttpStatus.OK,
            message: data.data ?? data,
          };
        }

        return data; // if data is null or undefined
      }),

      catchError((err) => {
        const status = err.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;

        // Preserve backend messages
        const message = err.response?.message || err.message || 'Something went wrong';
        const errors = Array.isArray(err.response?.message) ? err.response.message : null;

        const errorResponse: any = {
          success: false,
          status,
          message,
        };

        if (errors) errorResponse.errors = errors;

        // Set HTTP status code
        response.status(status);

        // Throw the structured HttpException
        return throwError(() => new HttpException(errorResponse, status));
      }),
    );
  }
}
