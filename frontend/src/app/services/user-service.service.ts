import { Injectable, Output, EventEmitter } from '@angular/core';

//import { HttpserviceService } from './httpservice.service';
import { User } from '../shared/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  private _friendsUrl = "http://socialmaps.openode.io/api/getFollowers";
  private _unfollowUrl = "http://socialmaps.openode.io/api/unfollow";
  private _searchUrl = "http://socialmaps.openode.io/api/findPerson";
  private _followUrl = "http://socialmaps.openode.io/api/follow";
  private _profileUrl = "http://socialmaps.openode.io/api/profileUser";

  followers: string[] = [];
  currentUser: User;
  @Output() currentUserEmitter = new EventEmitter<User>();
  @Output() followersEmitter = new EventEmitter<string[]>();
  searchObject;
  @Output() foundUsers = new EventEmitter<string[]>();

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
   }

    registerUser(formdata: FormGroup){
      const form = formdata.getRawValue();
    this.auth.registerUser(form).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('currentuser', JSON.stringify(form.username));
        this.router.navigate(['/kaart']);
      },
      err => console.log(err)
      )
  }


  getFollowers(){
    console.log(this.followers);
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
  }


  fetchFollowers(){
    const followers: string[] = [];
    const cu = JSON.parse(localStorage.getItem('currentuser'));
    console.log(cu);
    return this.http.post<any>(this._friendsUrl,{'username':cu});
    //this.followersEmitter.emit(followers);
  }


  unfollowUser(username: string){
    const ownUsername = JSON.parse(localStorage.getItem("currentuser"));
    const obj = {
      "username": ownUsername,
      "unfollow": username
    };
    console.log(ownUsername);
    let fol = JSON.parse(localStorage.getItem('currentfollowing'));
    if(fol.length === 1){
      let pos = JSON.parse(localStorage.getItem('posts'));
      pos = [];
      localStorage.setItem('posts', JSON.stringify(pos));
      fol = [];
    }
    localStorage.setItem('currentfollowing', JSON.stringify(fol));
    this.http.post(this._unfollowUrl, obj, {responseType: 'text'}).subscribe(res => {
      //console.log(res);
    });
    this.fetchFollowers();
  }

  followUser(username: string){
    const ownUsername = JSON.parse(localStorage.getItem("currentuser"));
    const obj = {
      "username": ownUsername,
      "follow": username
    };
    console.log(obj);
    this.http.post(this._followUrl, obj, {responseType: 'text'}).subscribe(res => {
      console.log(res);
    });
    
  }


  searchPeople(query){
    this.searchObject = query;
    this.searchSend();
  }

  searchSend(){
    const q = {
      "username": this.searchObject
    }
    return this.http.post(this._searchUrl, q).subscribe(users => {
      const found: string[] = [];
      for(let user in users){
        if(users[user] != JSON.parse(localStorage.getItem('currentuser'))){
          found.push(users[user]);
        }
      }
      this.foundUsers.emit(found);
    });
  }

  fetchProfile(username: string){
    const obj = {
      "username": username
    }
     return this.http.post(this._profileUrl, obj);
    }
  

}
