 import { Component, OnInit } from '@angular/core';
 import { AuthService } from '../../auth.service';
 import { Router } from '@angular/router';

 @Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
 })
 export class LoginComponent implements OnInit {

   loginUserData = {}

   constructor(private _auth: AuthService,
     private _router: Router) { }

   loginUser(){
     this._auth.loginUser(this.loginUserData)
     .subscribe(
       res=> {
         sessionStorage.setItem('userObject', res.userObject)
         console.log(sessionStorage.getItem('userObject'))
         localStorage.setItem('token', res.token)
         this._router.navigate(['/kaart'])
       },
       err=> console.log(err)
       )
   }
   ngOnInit() {

   }

 }
