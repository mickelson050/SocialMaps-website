import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { MessageServiceService }  from '../services/message-service.service';
import { Message } from '../shared/message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {


  @Output() myMessages = new EventEmitter<Message[]>();
  noMessages: boolean;
  events = []
  constructor(private _eventService: EventService,
    private _router: Router, private messageservice: MessageServiceService) {
    }

  ngOnInit() {

    this.messageservice.fetchOwnPosts().subscribe(posts => {
      const postArray: Message[] = [];
      for(let post in posts){
        const msg = new Message(posts[post]._id, posts[post].lat, posts[post].lon, posts[post].username, posts[post].content);
        postArray.push(msg);
      }
      localStorage.setItem('ownposts', JSON.stringify(postArray));
      this.noMessages = false;
      this.myMessages.emit(postArray);
    },
      error => {
        this.myMessages.emit(JSON.parse(localStorage.getItem('ownposts')));
      }
    );


  	this._eventService.getMymessages()
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


  onDeletePost(id: string){
    this.messageservice.deletePost(id);
    setTimeout(function(){ window.location.reload(); }, 500);
  }

}
