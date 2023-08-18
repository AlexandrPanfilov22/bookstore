import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { BehaviorSubject, catchError, Observable, switchMap, take, throwError } from 'rxjs';

import { AuthorizationService } from '../authorization/services/authorization.service';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  private _isRefreshing: boolean = false;
  private _refreshTokenSubject = new BehaviorSubject<string>('');

  constructor(
    private _authorizationService: AuthorizationService,
  ) {}

  public intercept(
    request: HttpRequest<Request>,
    next: HttpHandler,
  ): Observable<HttpEvent<Event>> {
    const accessToken: string | null = this._authorizationService.getAccessToken();

    if (accessToken) {
      request = this._addAuthorizationHeader(request, accessToken);
    }

    return next.handle(request)
      .pipe(
        catchError((error: HttpResponse<Response>) => {
          if (error.status === 401 && !request.url.includes('refresh')) {
            return this._handle401Error(request, next);
          }

          return throwError(() => error);
        }),
      );
  }

  private _addAuthorizationHeader(
    request: HttpRequest<Request>,
    accessToken: string,
  ): HttpRequest<Request> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  private _handle401Error(
    request: HttpRequest<Request>,
    next: HttpHandler,
  ): Observable<HttpEvent<Event>> {
    if (!this._isRefreshing) {
      this._isRefreshing = true;
      this._refreshTokenSubject.next('');

      const refreshToken: string | null = this._authorizationService.getRefreshToken();

      if (!refreshToken) {
        this._authorizationService.logOut();
        this._isRefreshing = false;
        this._refreshTokenSubject.next('');

        return throwError(() => 'Refresh token missing');
      }

      return this._authorizationService.refreshToken({ refresh: refreshToken })
        .pipe(
          switchMap((response: { access: string }) => {
            this._isRefreshing = false;
            this._refreshTokenSubject.next(response.access);

            return next.handle(this._addAuthorizationHeader(request, response.access));
          }),
          catchError((error: HttpResponse<Response>) => {
            this._isRefreshing = false;
            this._authorizationService.logOut();
            this._refreshTokenSubject.next('');

            return throwError(() => error);
          }),
        );
    }

    return this._refreshTokenSubject.pipe(
      take(1),
      switchMap((accessToken: string) => {
        this._refreshTokenSubject.next('');

        return next.handle(this._addAuthorizationHeader(request, accessToken));
      }),
    );
  }
}
