import { Component, OnInit } from '@angular/core';

import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserServiceService } from '../services/user-service.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  myFriends: User[] = this.friendsservice.getFriends();

  events = []
  constructor(private friendsservice: UserServiceService,
    private _eventService: EventService,
    private _router: Router) { }

  ngOnInit() {
  	this.myFriends = this.friendsservice.getFriends();
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

  logFriends(){
  	console.log(this.myFriends);
  }

}
