import { Injectable, Output, EventEmitter } from '@angular/core';

import { Message } from '../shared/message.model';
import { User } from '../shared/user.model';
import { UserServiceService} from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  friends: User[] = [];
  friendsMessages: Message[] = [];
  ownMessages: Message[] = [];
  @Output() selectedMessage = new EventEmitter<Message>();
  testarray = ['test', 'ta'];



  constructor(private userservice: UserServiceService) {
  	this.friends = this.userservice.getFriends();

  	this.friendsMessages = [
	  	new Message(53.241763, 6.577156, 'username', '14-11-1-2019'),
	  	new Message(53.223554, 6.554692, 'username', '14-11-1-2019'),
	   	new Message(53.251083, 6.609280, 'username', '14-11-1-2019'),
	  	new Message(53.191291, 6.482590, 'username', '14-11-1-2019'),
  	];

    this.owsnMessages = [
      new Message(53.241763, 6.577156, 'ownusername', '14-11-1-2019'),
      new Message(53.223554, 6.554692, 'ownusername', '14-11-1-2019'),
      new Message(53.251083, 6.609280, 'ownusername', '14-11-1-2019'),
      new Message(53.191291, 6.482590, 'ownusername', '14-11-1-2019'),
    ];

   }

   getOwnMessages(){
    return this.owsnMessages;
   }

   getMessages(){
   	//console.log(this.friends);
   	return this.friendsMessages;
   }

   onMessageSelected(message: Message){
    this.selectedMessage.emit(message);
   }



}
