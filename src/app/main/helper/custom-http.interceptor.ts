import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {StorageService} from "../services/storage.service";
import {enviroment} from "../enviroment/env";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.storage.getUser();
    const isLoggedIn = user && this.storage.getKey();
    const isApiUrl = request.url.startsWith(enviroment.baseUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.storage.getKey()}` }
      });
    }

    return next.handle(request)
  }
}

export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
];
