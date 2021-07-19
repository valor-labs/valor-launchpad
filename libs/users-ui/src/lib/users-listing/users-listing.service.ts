import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersListingService {
  constructor(private httpClient: HttpClient) {
  }

  getUsers(){
    return this.httpClient.get('/api/users/v1/all')
  }
}
