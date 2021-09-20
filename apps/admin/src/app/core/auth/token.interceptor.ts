import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import {EMPTY, Observable, Subject, throwError} from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  refreshTokenInProgress = false;

  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();
  constructor(public auth: AuthService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request)
      .pipe(catchError(err => this.handleResponseError(err, request, next)));
  }

  handleResponseError(error, request?, next?) {
    if (error.status === 401) {
      return this.refreshToken().pipe(
        switchMap(() => {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${this.auth.getToken()}`
            }
          });
          return next.handle(request);
        }),
        catchError(e => {
          if (e.status !== 401) {
            return this.handleResponseError(e);
          } else {
            this.logout();
          }
        })
      );
    }
    return throwError(error);
  }

  refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;
      return this.auth.refreshToken().pipe(
        tap(() => {
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        }),
        // catchError(() => {
        //   this.refreshTokenInProgress = false;
        //   this.logout();
        //   return EMPTY;
        // })
      );
    }
  }

  logout() {
    console.trace('123');
    // this.auth.logout();
    this.router.navigate(['sign-in']);
  }
}
