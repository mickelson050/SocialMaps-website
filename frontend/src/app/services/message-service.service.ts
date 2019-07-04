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

  private _followingPosts = "http://socialmaps.openode.io/api/getFollowerPosts";
  private _ownPostUrl = "http://socialmaps.openode.io/api/getMyPosts";
  private _deleteUrl = "http://socialmaps.openode.io/api/delMyPost";

  friends: User[] = [];
  friendsMessages: Message[] = [];
  ownMessages: Message[] = [];
  @Output() selectedMessage = new EventEmitter<Message>();

  //@Output() friensMessagesEmitter = new EventEmitter<Message[]>();



  constructor(private userservice: UserServiceService, private auth: AuthService, private http: HttpClient) {

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
    const username = JSON.parse(localStorage.getItem("currentuser"));
    const obj = {
      "username": username
    }

      return this.http.post(this._followingPosts,obj);
  }

  fetchOwnPosts(){
    const username = JSON.parse(localStorage.getItem("currentuser"));
    const obj = {
      "username": username
    }
    return this.http.post(this._ownPostUrl, obj);
  }

  deletePost(id: string){
    console.log(id);
    const obj = {
      "_id": id,
    }
    console.log(obj);
    this.http.post(this._deleteUrl, obj).subscribe();
    
  }

}
