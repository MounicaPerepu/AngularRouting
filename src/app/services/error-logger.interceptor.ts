import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ErrorLoggerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.setError(error);
          console.log(error);
          throw error.error;
          // return throwError(errorMessage);
        })
      );
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occured';
    if(error.error instanceof ErrorEvent) {
        // Client side error
        errorMessage = error.error.message;
    } else {
        // server side error
        if (error.status!==0) {
            errorMessage = error.error.errorMessage;
        }
    }
    return errorMessage;
}
}
