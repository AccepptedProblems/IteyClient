import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {StorageService} from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request)
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status) && this.storage.getKey()) {
        // auto logout if 401 or 403 response returned from api
        this.storage.clean()
      }

      const error = (err && err.error && err.error.message) || err.statusText;
      console.error(err);
      return throwError(error);
    }))
  }
}

export const ErrorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
