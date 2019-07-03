import { User } from './user.model';

export class Message{

	latitude: number;
	longitude: number;
	owner: string;
	datetime: string; 
	id: string;
	content: string;

	constructor(id: string, lat: number, long: number, owner: string, content: string){
		this.id = id;
		this.latitude = lat;
		this.longitude = long;
		this.owner = owner;
		this.content = content;
	}

}