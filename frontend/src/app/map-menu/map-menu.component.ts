import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MessageServiceService } from '../services/message-service.service';
import { Message } from '../shared/message.model';
import { User } from '../shared/user.model';


@Component({
  selector: 'app-map-menu',
  templateUrl: './map-menu.component.html',
  styleUrls: ['./map-menu.component.css']
})
export class MapMenuComponent implements OnInit { 

  @Output() availableMessages = new EventEmitter<Message[]>();
  messagesLoaded: boolean = false;

  constructor(private messageservice: MessageServiceService) {

   }

  ngOnInit() {

    this.messageservice.fetchPosts().subscribe( posts => {
      let messageArray: Message[] = [];
        for(let post in posts){
          console.log(post);
          const msg = new Message(posts[post]._id, posts[post].lat, posts[post].lon, posts[post].username, 'Not available');
          messageArray.push(msg);
        }
        if(JSON.parse(localStorage.getItem('currentfollowing')).length === 0){
          messageArray = [];
        }
        localStorage.setItem('posts', JSON.stringify(messageArray));
        this.availableMessages.emit(messageArray);
    },
      error => {
        this.availableMessages.emit(JSON.parse(localStorage.getItem('posts')));
      }
    );
  }

  zoomInOnMessage(message: Message){
  	this.messageservice.onMessageSelected(message);
  }

}
