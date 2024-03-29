import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../shared/user.model';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-friends-list-item',
  templateUrl: './friends-list-item.component.html',
  styleUrls: ['./friends-list-item.component.css']
})
export class FriendsListItemComponent implements OnInit {

  @Input() user: string;
  @Output() searchQuery = "";
   userShowed: boolean = false;
  userInfo: any;

  constructor(private friendservice: UserServiceService) {
   }

  ngOnInit() {
  }

    showProfile(){
    	if(this.userShowed === false){
   		 this.friendservice.fetchProfile(this.user).subscribe(data => {
    		console.log(data[0]);
    		const userObject = {
    		'firstname': data[0].firstname,
    		'lastname': data[0].lastname,
    		'birthdate': data[0].birthdate,
    		'gender': data[0].gender,
    		'habitation': data[0].habitation,
    		'profilepicture': data[0].profilepicture,
    	}
    	if(userObject.profilepicture === null){
    		userObject.profilepicture = "https://i0.wp.com/sooz.nl/content/uploads/2018/09/default-user-image.png?fit=300%2C300&ssl=1&is-pending-load=1";
    	}
    	this.userInfo = userObject;
    });
   		 setTimeout(function(){ this.userShowed = true; }, 100);
   		 this.userShowed = true;
    }else{
    	this.userShowed = false;
    }
}

	  unfollowUser(username: string){
    	this.friendservice.unfollowUser(username);
    	setTimeout(function(){ window.location.reload(); }, 500);
 	 }


}
