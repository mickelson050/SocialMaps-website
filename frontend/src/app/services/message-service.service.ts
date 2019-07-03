import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from '../shared/message.model';
import { User } from '../shared/user.model';
import { UserServiceService} from './user-service.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {

  private _postsUrl = "http://socialmaps.openode.io/api/getAllPosts"

  friends: User[] = [];
  friendsMessages: Message[] = [];
  ownMessages: Message[] = [];
  @Output() selectedMessage = new EventEmitter<Message>();

  //@Output() friensMessagesEmitter = new EventEmitter<Message[]>();



  constructor(private userservice: UserServiceService, private auth: AuthService, private http: HttpClient) {


    this.ownMessages = [
      new Message(53.241763, 6.577156, 'ownusername'),
      new Message(53.223554, 6.554692, 'ownusername'),
      new Message(53.251083, 6.609280, 'ownusername'),
      new Message(53.191291, 6.482590, 'ownusername'),
    ];

   }

   getOwnMessages(){
    return this.ownMessages;
   }

   getMessages(){
   	return this.friendsMessages;
   }

   onMessageSelected(message: Message){
    this.selectedMessage.emit(message);
   }

   getPosts(){
     return this.fetchPosts();
   }


  fetchPosts(){
    this.friendsMessages = [];
    this.http.post(this._postsUrl,null).subscribe(posts => {
      for(let post in posts){
        //console.log(post);
        this.friendsMessages.push(
          new Message(posts[post].lat, posts[post].lon, posts[post].user)
          )
      }
      console.log(this.friendsMessages)
      //this.friensMessagesEmitter.emit(this.friendsMessages)
    });
    //localStorage.setItem('posts',JSON.stringify(this.friendsMessages));
    console.log(this.friendsMessages);
    return this.friendsMessages;
  }

}
