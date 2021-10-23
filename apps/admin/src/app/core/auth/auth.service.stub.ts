import { IAuthService } from './auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

const MOCK_USER = {
  firstName: 'John',
  lastName: 'Snow',
};

export class AuthServiceStub implements IAuthService {
  access_token;
  user = new BehaviorSubject<any>(MOCK_USER);
  checkIfUsernameExists() {
    //
  }
  signUp() {
    //
  }
  signOut() {
    //
  }
  getCurrentUser(): Observable<any> {
    return of(MOCK_USER);
  }
  getToken() {
    //
  }
  isLoggedIn() {
    //
  }
  generateNewAccessToken() {
    //
  }
}
