import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  constructor() {
  }

  user: object;
  maintainance: object;

  getUserFromBackend() {
  }

  isLoggedIn() {
    return this.user !== undefined;
  }

  logOut() {
  }

  checkPermission(permissions) {

  }
}
