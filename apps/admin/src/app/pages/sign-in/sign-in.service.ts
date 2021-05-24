import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private httpClient: HttpClient) {

  }

  async login(signInForm) {
    await this.httpClient.post('api/auth/v1/login', signInForm).subscribe((data) => {
      console.log(data);
    })
  }
}
