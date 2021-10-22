import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ENV_CONFIG,
  EnvironmentConfig,
} from '../../../../../apps/admin/src/app/core/http/environment-config.interface';
import { UserListLine } from '@valor-launchpad/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersListingService {
  baseURL = this.config.environment.apiBase + 'api/users/v1/';

  constructor(
    @Inject(ENV_CONFIG) private config: EnvironmentConfig,
    private httpClient: HttpClient
  ) {}

  getAvailableRoles() {
    return this.httpClient.get(this.baseURL + 'getRoles');
  }

  getTags() {
    return this.httpClient.get<{ name: string; id: string }[]>(
      this.baseURL + 'tags'
    );
  }

  addUser(addUserForm: any) {
    return this.httpClient.post(this.baseURL + 'add', addUserForm);
  }

  editUser(editUserForm: any) {
    return this.httpClient.post(this.baseURL + 'edit', editUserForm);
  }

  getUsers(roles: string[], tags: string[], keyword?: string) {
    let httpParams = new HttpParams();
    if (Array.isArray(roles) && roles.length > 0) {
      httpParams = httpParams.append('roles', roles.join(','));
    }
    if (Array.isArray(tags) && tags.length > 0) {
      httpParams = httpParams.append('tags', tags.join(','));
    }
    if (typeof keyword === 'string' && keyword.trim().length > 0) {
      httpParams = httpParams.append('keyword', keyword);
    }
    return this.httpClient.get<UserListLine[]>(this.baseURL + 'all', {
      params: httpParams,
    });
  }

  deleteUser(username: string) {
    return this.httpClient.post(this.baseURL + 'delete', { username });
  }

  batchDeleteUser(userIds: string[]) {
    return this.httpClient.post(this.baseURL + 'batchDelete', { userIds });
  }

  restoreUser(username: string) {
    return this.httpClient.post(this.baseURL + 'restore', { username });
  }

  batchRestoreUser(userIds: string[]) {
    return this.httpClient.post(this.baseURL + 'batchRestore', { userIds });
  }

  resetPassword(username: string) {
    return this.httpClient.post(this.baseURL + 'resetPassword', { username });
  }

  resendEmail(id: string) {
    return this.httpClient.post(this.baseURL + 'resendEmail', { id });
  }

  batchAddTags(userIds: string[], tags: { id?: string; name: string }[]) {
    return this.httpClient.post(this.baseURL + 'batchAddTags', {
      userIds,
      tags,
    });
  }
}
