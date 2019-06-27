import { Component, OnInit } from '@angular/core';

import { MessageServiceService }  from '../services/message-service.service';
import { Message } from '../shared/message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  myMessages: Message[] = [];

  constructor(private messageservice: MessageServiceService) { 
  	this.myMessages = this.messageservice.getOwnMessages();
  }

  ngOnInit() {
  }


}
