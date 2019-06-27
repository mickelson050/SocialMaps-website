import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

	private _kaartUrl = "http://localhost:80/api/kaart"
	private _friendsUrl = "http://localhost:80/api/friends"
	private _mymessagesUrl = "http://localhost:80/api/mymessages"

  constructor(private http: HttpClient) { }

  getKaart(){
  	return this.http.get<any>(this._kaartUrl)
  }
   getFriends(){
  	return this.http.get<any>(this._friendsUrl)
  }
   getMymessages(){
  	return this.http.get<any>(this._mymessagesUrl)
  }
}
