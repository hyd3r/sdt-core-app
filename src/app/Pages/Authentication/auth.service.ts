import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _userIsAuthenticated = false;
  private _userId = "id1";

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor() { }

  get userId() {
    return this._userId;
  }

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this._userIsAuthenticated = false;
  }

}
