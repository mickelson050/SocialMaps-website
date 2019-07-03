import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  genders = ['Man', 'Vrouw'];
  signupForm: FormGroup;

  constructor(private userservice: UserServiceService) { }

  ngOnInit() {
  	this.signupForm = new FormGroup({
  		'firstname': new FormControl(null, [Validators.required]),
  		'lastname': new FormControl(null, [Validators.required]),
  		'gender': new FormControl(null, [Validators.required]),
  		'birthdate': new FormControl(null, [Validators.required]),
  		'habitation': new FormControl(null, [Validators.required]),
  		'email': new FormControl(null, [Validators.required, Validators.email]),
  		'username': new FormControl(null, [Validators.required]),
  		'password': new FormControl(null, [Validators.required]),
  		'passwordrepeat': new FormControl(null, [Validators.required], this.passwordsNoMatch.bind(this)),
  		'profilepicture': new FormControl(null),
  	})

  }

    passwordsNoMatch(control: FormControl): Promise<any> {
  	const promise = new Promise<any>((resolve, reject) => {

  			if(this.signupForm.get('password').value !== this.signupForm.get('passwordrepeat').value){
  				resolve({'passwordsNoMatch': true});
  			} else{
  				resolve(null);
  			}
  	});
  	return promise;
  }

 resetForm(){
 	this.signupForm.reset();
 }

 onSubmit() {
    console.log();
    this.userservice.registerUser(this.signupForm);
  }


}
