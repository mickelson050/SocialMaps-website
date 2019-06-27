import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../shared/user.model';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-friends-list-item',
  templateUrl: './friends-list-item.component.html',
  styleUrls: ['./friends-list-item.component.css']
})
export class FriendsListItemComponent implements OnInit {

  @Input() user: User;
  @Output() searchQuery = "";

  constructor(private friendservice: UserServiceService) {
   }

  ngOnInit() {
  }

}
