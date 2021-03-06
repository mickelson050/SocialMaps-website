import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Message } from './shared/message.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://socialmaps.openode.io/api/register"
  private _loginUrl = "http://socialmaps.openode.io/api/login"
  // private _registerUrl = "http://localhost:80/api/register"
  // private _loginUrl = "http://localhost:80/api/login"

  constructor(private http: HttpClient,
            private _router: Router) {
             }

  //this function accepts a user object and returns the 
  //response from backend api, either error or the registered user
  registerUser(user){
  	return this.http.post<any>(this._registerUrl, user)

  }

  loginUser(user){
    sessionStorage.setItem('id',user.id)
  	return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn(){
  	return !!localStorage.getItem('token');
  }

  logoutUser(){
    // localStorage.removeItem('token');
    // localStorage.removeItem('currentuser');
    // localStorage.removeItem('currentfollowing');
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
