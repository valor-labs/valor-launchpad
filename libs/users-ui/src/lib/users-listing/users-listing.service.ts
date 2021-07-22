import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersListingService {
  baseURL = '/api/users/v1/'

  constructor(private httpClient: HttpClient) {
  }

  getAvailableRoles(){
    return this.httpClient.get(this.baseURL + 'getRoles')
  }

  addUser(addUserForm: any) {
    return this.httpClient.post(this.baseURL + 'add', addUserForm)
  }

  getUsers() {
    return this.httpClient.get(this.baseURL + 'all')
  }

  deleteUser(username: string) {
    return this.httpClient.post(this.baseURL + 'delete', {username})
  }

  restoreUser(username: string) {
    return this.httpClient.post(this.baseURL + 'restore', {username})
  }

  resetPassword(username: string) {
    return this.httpClient.post(this.baseURL + 'resetPassword', {username})
  }

  resendEmail(id:string){
    return this.httpClient.post(this.baseURL + 'resendEmail', {id})
  }
}