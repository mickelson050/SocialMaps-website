const mongoose = require('mongoose')

const Schema = mongoose.Schema
const npUserSchema = new Schema({
	firstname: String,
	lastname: String,
	gender: String,
	habitation: String,
	email: String,
	birthdate: String,
	username: String,
	profilepicture: String,
	password: {type:String, select:false},
	following: [String]

})

module.exports = mongoose.model('npUsers', npUserSchema, 'users') 