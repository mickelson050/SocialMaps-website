import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserServiceService } from '../services/user-service.service';
import { User } from '../shared/user.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  @Output() followers = new EventEmitter<string[]>();
  @Output() usersFound = new EventEmitter<string[]>();


  events = [];

  constructor(private friendsservice: UserServiceService,
    private _eventService: EventService,
    private _router: Router) {


       
     }

  ngOnInit() {

    this.friendsservice.fetchFollowers().subscribe(followers =>{
      const folArray: string[] = [];
      for(let follower of followers){
        folArray.push(follower);
      }
      this.followers.emit(folArray);
    });

    this.friendsservice.foundUsers.subscribe(users => {
      console.log(users);
      this.usersFound.emit(users);
    });


    this._eventService.getFriends()
      .subscribe(
        res => this.events = res,
        err => {
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }

  unfollowUser(username: string){
    this.friendsservice.unfollowUser(username);
    //window.location.reload();
    setTimeout(function(){ window.location.reload(); }, 500);
  }


  followUser(username: string){
    console.log(username);
    this.friendsservice.followUser(username);
    setTimeout(function(){ window.location.reload(); }, 500);
  }


  checkUser(username: string){
    const currentFollowers = localStorage.getItem("currentfollowing");
    if(currentFollowers.indexOf(username) > -1){
      return true;
    }else{
      return false;
    }
  }


}
