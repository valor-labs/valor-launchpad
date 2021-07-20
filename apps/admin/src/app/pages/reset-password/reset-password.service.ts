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
    console.log('username:' +username)
    return this.httpClient.post(this.baseURL + 'resetPassword', {username})
  }
}
