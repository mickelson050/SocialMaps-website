import { Component, OnInit } from '@angular/core';

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
		private _router: Router) { }

	latitude = 53.216978;
	longitude = 6.567029;
	zoom = 9;

	messagesToDisplay: Message[] = [];

	ngOnInit(){
		this.messagesToDisplay = this.messageservice.getMessages();
		this.messageservice.selectedMessage.subscribe(
			(message: Message) => (this.changeCoords(message)) 
			);
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
		)
	}

	changeCoords(message: Message){
		this.latitude = message.latitude;
		this.longitude = message.longitude;
		this.zoom = 18;
	}


}
