import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Notyf, NOTYFToken } from '@valor-launchpad/ui';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string>(null);
  constructor(
    public auth: AuthService,
    private router: Router,
    @Inject(NOTYFToken) private notyf: Notyf
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authedReq = request;
    const token = this.auth.getToken();
    if (token != null) {
      authedReq = this.addTokenHeader(request, token);
    }

    return next.handle(authedReq).pipe(
      catchError((err) => {
        if (
          err instanceof HttpErrorResponse &&
          !authedReq.url.includes('/api/auth/v1/login') &&
          !authedReq.url.includes('/api/auth/v1/refresh') &&
          err.status === 401
        ) {
          return this.handle401Error(authedReq, next);
        }
        return this._handleError(err);
      })
    );
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        return this.auth.generateNewAccessToken().pipe(
          switchMap((token) => {
            this.isRefreshing = false;
            this.auth.access_token = token.accessToken;
            this.refreshTokenSubject.next(token.accessToken);
            return next.handle(this.addTokenHeader(request, token.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            localStorage.removeItem('refresh_token');
            return throwError(err);
          })
        );
      } else {
        this.router.navigate(['/sign-in']);
      }
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private _handleError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 500) {
      this.notyf.error('Something wrong, please try again later.');
    }
    return throwError(err);
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
    });
  }
}
