import { IAuthService } from './auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RequestingUser } from '@valor-launchpad/api-interfaces';

const MOCK_USER: RequestingUser = {
  id: 'fake_user_id',
  username: 'johnsnow',
  firstName: 'John',
  lastName: 'Snow',
  email: 'johnsnow@gmail.com',
  passwordResetNeeded: false,
  emailVerified: true,
  profile: {
    id: 'string',
    name: 'John Snow',
    username: 'johnsnow',
    title: 'string',
    location: 'string',
    from: 'string',
    city: 'string',
    zip: 'string',
    language: 'string',
    locale: 'string',
    timeZone: 'string',
    bio: 'string',
    address: 'string',
    avatar: {
      id: 'string',
      type: 'string',
      src: 'string',
      src_webp: 'string',
      alt: 'string',
    },
  },
  userRoles: [
    {
      id: 'ur',
      role_id: 'fake_role_id',
      user_id: 'fake_user_id',
      rolesEntity: {
        id: 'fake_role_id',
        role: 'Admin',
      },
    },
  ],
};

export class AuthServiceStub implements IAuthService {
  access_token;
  user = new BehaviorSubject<RequestingUser>(MOCK_USER);
  checkIfUsernameExists() {
    return of({ existedUsername: false });
  }
  signUp() {
    return of({ username: 'johnsnow' });
  }
  signOut() {
    return of(undefined);
  }
  getCurrentUser(): Observable<RequestingUser> {
    return of(MOCK_USER);
  }
  getToken() {
    return 'fake_token';
  }
  isLoggedIn() {
    return of(true);
  }
  generateNewAccessToken() {
    return of({
      access_token: 'string',
      refresh_token: 'string',
      user: MOCK_USER,
    });
  }
}
