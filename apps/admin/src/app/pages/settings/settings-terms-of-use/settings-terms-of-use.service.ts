import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG, EnvironmentConfig } from '@valor-launchpad/http';
import { TermsOfUseEntity } from '@valor-launchpad/common-api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum TermsOfUseType {
  Add = 'Add',
  View = 'View',
  Edit = 'Edit',
}

@Injectable({
  providedIn: 'root',
})
export class SettingsTermsOfUseService {
  private apiBase = this.config.environment.apiBase;

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private http: HttpClient
  ) {}

  fetchTermsOfUseList(): Observable<TermsOfUseEntity[]> {
    return this.http
      .get<{ data: TermsOfUseEntity[] }>(
        `${this.apiBase}api/terms-of-use/v1/terms-of-use-list`
      )
      .pipe(
        map(({ data }) => {
          return data;
        })
      );
  }

  addTermsOfUse(termOfUse: Partial<TermsOfUseEntity>) {
    const { title, content } = termOfUse;

    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiBase}api/terms-of-use/v1/create-terms-of-use`,
      {
        title,
        content,
      }
    );
  }
}
