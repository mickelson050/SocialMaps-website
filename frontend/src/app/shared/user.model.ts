export class User{

	username: string;
	_id: string;
	firstname: string;
	lastname: string;
	gender: string;
	habitation: string;
	email: string;
	birthdate: string;
	profilepicture: string;

	constructor(username: string, userId: string, firstName: string, lastName: string, gender:string, habitation: string, userMail: string, dateOfBirth: string, profilePicturePath: string){
		this.username = username;
		this._id = userId;
		this.firstname = firstName;
		this.lastname = lastName;
		this.gender = gender;
		this.habitation = habitation;
		this.email = userMail;
		this.birthdate = dateOfBirth;
		this.profilepicture = profilePicturePath;
	}


}