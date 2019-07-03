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
      console.log(posts);
      const messageArray: Message[] = [];
        for(let post in posts){
          const msg = new Message(posts[post].lat, posts[post].lon, posts[post].username);
          messageArray.push(msg);
        }
        this.availableMessages.emit(messageArray);
    });
  }

  zoomInOnMessage(message: Message){
  	this.messageservice.onMessageSelected(message);
  }

}
