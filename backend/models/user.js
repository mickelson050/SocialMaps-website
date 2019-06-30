const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
	firstname: String,
	lastname: String,
	gender: String,
	habitation: String,
	email: String,
	birthdate: String,
	username: String,
	password: String,
	// password: {type: String, select: false},
	profilepicture: String,
	following: [String]

})

module.exports = mongoose.model('users', userSchema, 'users') 