import { Component, OnInit } from '@angular/core';

import { MessageServiceService } from '../services/message-service.service';
import { Message } from '../shared/message.model';
import { User } from '../shared/user.model';


@Component({
  selector: 'app-map-menu',
  templateUrl: './map-menu.component.html',
  styleUrls: ['./map-menu.component.css']
})
export class MapMenuComponent implements OnInit { 

  availableMessages: Message[];
  messagesLoaded: boolean = false;

  constructor(private messageservice: MessageServiceService) {
    //this.availableMessages = this.messageservice.fetchPosts();
   }

  ngOnInit() {
    //this.availableMessages = [];
    this.availableMessages = this.messageservice.fetchPosts();
  }

  zoomInOnMessage(message: Message){
  	this.messageservice.onMessageSelected(message);
  }

}
