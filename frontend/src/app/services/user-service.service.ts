import { Injectable } from '@angular/core';

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


  friends: User[] = [];

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
    this.fetchUsers();
   }


  getFriends(){
    console.log(this.friends);
  	return this.friends;
  }

  addFriends(users: any){
    //console.log(users);
      for(let user in users){
        this.friends.push(
          new User(users[user].username,
            1,
            users[user].firstname,
            users[user].lastname,
            users[user].gender,
            users[user].habitation,
            users[user].email,
            users[user].birthdate,
            users[user].profilepicture,
            )
          )
      }
  }

    registerUser(formdata: FormGroup){
      console.log(formdata.getRawValue());
      const form = formdata.getRawValue();
    // this.http.post('https://socialmaps-19e9e.firebaseio.com/users.json', formdata.value).subscribe(responseData => {console.log(responseData)});
    this.auth.registerUser(form).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token)
        this.router.navigate(['/kaart'])
      },
      err => console.log(err)
      )
  }


    private fetchUsers(){
      //console.log('fetching');
      this.http.get('https://socialmaps-19e9e.firebaseio.com/users.json').pipe(map(responseData => {
        const postArray = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key], id: key})
        }
        }
        return postArray;
      })
    ).subscribe(posts => {this.addFriends(posts)});
  }






}
