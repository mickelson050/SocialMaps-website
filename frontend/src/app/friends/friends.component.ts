import { Component, OnInit } from '@angular/core';

import { UserServiceService } from '../services/user-service.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  myFriends: User[] = this.friendsservice.getFriends();

  constructor(private friendsservice: UserServiceService) {
   }

  ngOnInit() {
  }


}
