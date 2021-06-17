import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerifyUserService {

  constructor(private httpClient: HttpClient) {
  }

  verify(token: string) {
    return this.httpClient.get(`/api/auth/v1/verify-user/${token}`)
  }
}
