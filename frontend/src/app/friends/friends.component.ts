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
      localStorage.setItem('currentfollowing', JSON.stringify(folArray));
      this.followers.emit(folArray);
    },
      error => {
        this.followers.emit(JSON.parse(localStorage.getItem('currentfollowing')));
      }
    );



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

  hasFollowers(){
    if(JSON.parse(localStorage.getItem('currentfollowing')).length > 0){
      return true;
    }else{
      return false;
    }
  }



}
