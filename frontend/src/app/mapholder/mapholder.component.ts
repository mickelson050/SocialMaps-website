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
		this.messageservice.fetchPosts().subscribe(posts => {
			const emptyArray: Message[] = [];
			const postArray: Message[] = [];
			for(let post in posts){
				postArray.push(new Message(posts[post]._id, posts[post].lat, posts[post].lon, posts[post].username, 'Not available'));
			}
			
			this.messagesToDisplay.emit(postArray);
		
		},
			error => {
				this.messagesToDisplay.emit(JSON.parse(localStorage.getItem('posts')));
			}
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
