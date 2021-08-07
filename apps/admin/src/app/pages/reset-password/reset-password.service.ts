import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  baseURL = '/api/users/v1/'

  constructor(private httpClient: HttpClient) {
  }

  resetPassword(username) {
    const url = `${this.baseURL}resetPassword`;
    return this.httpClient.post(url, {username})
  }
}
