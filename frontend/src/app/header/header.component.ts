import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

currentUser: User;

currentUserName: Promise<string>;

  //currentUserName: string = '';
  constructor(public _authService: AuthService, private userservice: UserServiceService) {
  	this.userservice.currentUserEmitter.subscribe(user => {
  		this.currentUser = user;
  		 //this.currentUserName = Promise.resolve(user.username);
       this.currentUserName = Promise.resolve(user.username);
  	});
   }



  ngOnInit() {
  }


}
