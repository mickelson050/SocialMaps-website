import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-search-friends',
  templateUrl: './search-friends.component.html',
  styleUrls: ['./search-friends.component.css']
})
export class SearchFriendsComponent implements OnInit {



  constructor(private userservice: UserServiceService) { }

  ngOnInit() {
  }



  searchPeople(query){
  	console.log("username in sf: " + query);
  	this.userservice.searchPeople(query);
  }






}
