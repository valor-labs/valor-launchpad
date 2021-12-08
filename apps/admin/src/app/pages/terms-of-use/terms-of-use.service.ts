import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from '@valor-launchpad/common-api';

@Injectable({
  providedIn: 'root',
})
export class TermsOfUseService {
  baseURL = this.config.environment.apiBase + 'api/terms-of-use/v1/';
  isAcceptTermsOfUse = false;

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private http: HttpClient
  ) {}

  public getUserTermsOfUse(): Observable<boolean> {
    const url = `${this.baseURL}user-terms-of-use`;

    if (this.isAcceptTermsOfUse) {
      return of(this.isAcceptTermsOfUse);
    } else {
      return this.http.get(`${url}`).pipe(
        map((result: { data: boolean }) => {
          this.isAcceptTermsOfUse = result.data;
          return this.isAcceptTermsOfUse;
        })
      );
    }
  }

  public acceptTermsOfUse() {
    const url = `${this.baseURL}accept-terms-of-use`;

    return this.http.post<IResponse>(`${url}`, {});
  }

  public getLatestTermsOfUse() {
    const url = `${this.baseURL}latest-terms-of-use`;

    return this.http.get<IResponse>(`${url}`);
  }

  public resetAcceptTermsOfUse() {
    this.isAcceptTermsOfUse = false;
  }
}
