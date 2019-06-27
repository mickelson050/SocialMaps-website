import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:80/api/register"
  private _loginUrl = "http://localhost:80/api/login"

  constructor(private http: HttpClient,
            private _router: Router) { }

  //this function accepts a user object and returns the 
  //response from backend api, either error or the registered user
  registerUser(user){
  	return this.http.post<any>(this._registerUrl, user)

  }

  loginUser(user){
  	return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn(){
  	return !!localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
