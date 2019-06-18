import { Component, OnInit } from '@angular/core';

import { MessageServiceService } from '../services/message-service.service';
import { Message } from '../shared/message.model';

@Component({
  selector: 'app-mapholder',
  templateUrl: './mapholder.component.html',
  styleUrls: ['./mapholder.component.css']
})
export class MapholderComponent implements OnInit {

  constructor(private messageservice: MessageServiceService) { }

  	latitude = 53.216978;
	longitude = 6.567029;
	zoom = 9;

	messagesToDisplay: Message[] = [];

	ngOnInit(){
		this.messagesToDisplay = this.messageservice.getMessages();
		this.messageservice.selectedMessage.subscribe(
			(message: Message) => (this.changeCoords(message)) 
			);
	}

	changeCoords(message: Message){
		this.latitude = message.latitude;
		this.longitude = message.longitude;
		this.zoom = 18;
	}


}
