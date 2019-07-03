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
		private _router: Router) {
		this.messagesToDisplay = this.messageservice.fetchPosts();
		 }

	latitude: number = 53.216978;
	longitude: number = 6.567029;
	zoom = 9;

	messagesToDisplay: Message[];

	ngOnInit(){
		this.messagesToDisplay = this.messageservice.getPosts();
		console.log(this.messagesToDisplay)
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
		);
	}

	changeCoords(message: Message){
		this.latitude = Number(message.latitude);
		this.longitude = Number(message.longitude);
		this.zoom = 18;
	}

}
