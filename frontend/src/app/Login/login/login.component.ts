
import { Component, OnInit, Output,  } from '@angular/core';
import { AuthService } from '../../auth.service';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';


 @Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
 })
 export class LoginComponent implements OnInit {


  loginUserData: FormGroup;
  currentUser; 

  constructor(private _auth: AuthService,
    private _router: Router,
    private userservice: UserServiceService) {
      this.loginUserData = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required]),

      });
     }

  loginUser(){
    //localStorage.removeItem('currentuser');
    const loginData = this.loginUserData.getRawValue();
    this._auth.loginUser(loginData)
      .subscribe(
        res=> {console.log(res)
        localStorage.setItem('token', res.token);
        this.userservice.storeCurrentUser(res.userObject);
        localStorage.setItem('currentuser', JSON.stringify(res.userObject.username));
        localStorage.setItem('currentfollowing', JSON.stringify(res.userObject.following));
        console.log(res.userObject);
        this._router.navigate(['/kaart'])
      },
        err=> console.log(err)
      )
  }
  ngOnInit() {


   }

 }
