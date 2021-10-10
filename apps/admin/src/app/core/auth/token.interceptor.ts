import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, map, mergeMap, retryWhen, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Notyf, NOTYFToken } from '@valor-launchpad/ui';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private router: Router,
              @Inject(NOTYFToken) private notyf: Notyf,
              ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // request = request.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${this.auth.access_token}`
    //   }
    // });
    return this.auth.token$.pipe(
      map(token => request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })),
      concatMap(authReq => next.handle(authReq)),
      retryWhen((errors: Observable<any>) => errors.pipe(
        mergeMap((error, index) => {
          if (error.status === 401 || error.status === 403) {
            if (this.router.url !== '/sign-in' && this.router.url !== '/') {
              // TODO remember getRemember() ?
              if (localStorage.getItem('refresh_token') && index === 0) {
                this.auth.generateNewAccessToken().subscribe();
              } else {
                this.notyf.error('Login expired, please log in again.');
                this.auth.access_token = undefined;
                this.router.navigate(['/sign-in']);
              }
            } else if (this.router.url === '/') {
              this.router.navigate(['/sign-in']);
            } else {
              this._handleError(error);
            }
          } else {
            this._handleError(error);
          }
          return throwError(error);
        }),
        take(2)
      )),
      catchError((err) => this._handleError(err))
    );
    // return next.handle(request)
    //   .pipe(
    //     retryWhen(errors => errors.pipe(
    //       tap(error => {
    //         if (error.status === 401 || error.status === 403) {
    //           if (this.router.url !== '/sign-in' && this.router.url !== '/') {
    //             // TODO remember getRemember() ?
    //             if (localStorage.getItem('refresh_token')) {
    //               this.auth.generateNewAccessToken();
    //             } else {
    //               this.notyf.error('Login expired, please log in again.');
    //               this.auth.access_token = undefined;
    //               this.router.navigate(['/sign-in']);
    //             }
    //           } else if (this.router.url === '/') { // first time enter website  why first time enter this function? 
    //             this.router.navigate(['/sign-in']);
    //           } else {
    //             throw error;
    //           }
    //         } else {
    //           throw error;
    //         }
    //       })  
    //     )),
    //     catchError(err => this._handleError(err))
    //   );
  }

  private _handleError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 500) {
      this.notyf.error('Something wrong, please try again later.');
    }
    return throwError(err);
  }
}
