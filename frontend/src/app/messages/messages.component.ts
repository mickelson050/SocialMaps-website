import { Component, OnInit } from '@angular/core';
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


  myMessages: Message[] = [];
  events = []
  constructor(private _eventService: EventService,
    private _router: Router, private messageservice: MessageServiceService) {
    this.myMessages = this.messageservice.getOwnMessages(); 
  }

  ngOnInit() {
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


}
