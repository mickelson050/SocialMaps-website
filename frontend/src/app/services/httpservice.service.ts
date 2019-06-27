import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http: HttpClient) {
    //this.fetchUsers();
   }

 // @Output() users = new EventEmitter<any>();


 //  registerUser(formdata: FormGroup){
 //  	this.http.post('https://socialmaps-19e9e.firebaseio.com/users.json', formdata.value).subscribe(responseData => {console.log(responseData)});
 //  }


 //    private fetchUsers(){
	//     this.http.get('https://socialmaps-19e9e.firebaseio.com/users.json').pipe(map(responseData => {
	//       const postArray = [];
	//       for(const key in responseData){
	//         if(responseData.hasOwnProperty(key)){
	//           postArray.push({...responseData[key], id: key})
	//       }
	//       }
	//       return postArray;
	//     })
 //    ).subscribe(posts => {this.users.emit(posts)});
 //  }


}
