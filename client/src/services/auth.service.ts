import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';

import { Keys } from '../config/keys';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName:string = null;
  baseurl = Keys.AUTH_API_URI;
  constructor(private http:HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  httpBaseParams = new HttpParams();

  RegisterUser(user:User) {
    return this.http.post<any>(`${this.baseurl}/register`, user);
  }

  LoginUser(userName:string, password:string) {
    this.userName = userName;
    return this.http.post<any>(`${this.baseurl}/login`, {userName, password})
  }

  LogoutUser() {
    this.userName = null;
    localStorage.removeItem('token');
  }

  isLoggedIn():Boolean {
    return !!localStorage.getItem('token');
  }

  getToken():string {
    return localStorage.getItem('token');
  }

  getUserName():string {
    return this.userName;
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
