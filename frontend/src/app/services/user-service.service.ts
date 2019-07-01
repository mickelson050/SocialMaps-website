import { Injectable, Output, EventEmitter } from '@angular/core';

//import { HttpserviceService } from './httpservice.service';
import { User } from '../shared/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  private _friendsUrl = "http://socialmaps.openode.io/api/getFollowers"

  followers: string[] = [];
  currentUser: User;
  @Output() currentUserEmitter = new EventEmitter<User>();

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
   }

    registerUser(formdata: FormGroup){
      const form = formdata.getRawValue();
    this.auth.registerUser(form).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token)
        this.router.navigate(['/kaart'])
      },
      err => console.log(err)
      )
  }


  getFollowers(){
    return this.followers;
  }


  storeCurrentUser(user: User){
    this.currentUser = new User(
      user.username,
      user._id,
      user.firstname,
      user.lastname,
      user.gender,
      user.habitation,
      user.email,
      user.birthdate,
      user.profilepicture
      );
    //localStorage.setItem('currentuser',this.currentUser);
    this.currentUserEmitter.emit(this.currentUser);
  }


  fetchFollowers(){
    const cu = JSON.parse(localStorage.getItem('currentuser'));
    console.log(cu.username);
    this.http.post<any>(this._friendsUrl,{'username':cu.username})
    .subscribe(
      users => {
      for(let user in users){
        console.log(user);
        this.followers.push(user);
      }
    },
    err =>{ console.log(err)}
    );
  }
}
