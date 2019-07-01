import { User } from './user.model';

export class Message{

	latitude: number;
	longitude: number;
	owner: string;
	datetime: string; 

	constructor(lat: number, long: number, owner: string){
		this.latitude = lat;
		this.longitude = long;
		this.owner = owner;
	}

}