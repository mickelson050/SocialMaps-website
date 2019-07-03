import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { MessageServiceService } from '../services/message-service.service';
import { Message } from '../shared/message.model';

@Component({
	selector: 'app-mapholder',
	templateUrl: './mapholder.component.html',
	styleUrls: ['./mapholder.component.css']
})
export class MapholderComponent implements OnInit {

	events = []
	constructor(private messageservice: MessageServiceService,
		private _eventService: EventService,
		private _router: Router) {
		 }

	latitude: number = 53.216978;
	longitude: number = 6.567029;
	zoom = 9;

	@Output() messagesToDisplay = new EventEmitter<Message[]>();

	ngOnInit(){

		this._eventService.getKaart()
		.subscribe(
			res => this.events = res,
			err => {
				if(err instanceof HttpErrorResponse){
					if(err.status === 401){
						this._router.navigate(['/login'])
					}
				}
			}
		);
		
		this.messageservice.fetchPosts().subscribe(posts => {
      		const messageArray: Message[] = [];
        for(let post in posts){
          const msg = new Message(posts[post].lat, posts[post].lon, posts[post].username);
          messageArray.push(msg);
        }
        this.messagesToDisplay.emit(messageArray);			
		});

		this.messageservice.selectedMessage.subscribe(
			(message: Message) => (this.changeCoords(message)) 
			);

	}

	changeCoords(message: Message){
		this.latitude = Number(message.latitude);
		this.longitude = Number(message.longitude);
		this.zoom = 18;
	}

}
