const express = require('express')
const router = express.Router()

const User = require('../models/user')

const mongoose = require('mongoose')
const db = 'mongodb+srv://AuthUser:BVSQScwj2Vffiv@authdb-a9deu.mongodb.net/SocialMaps?retryWrites=true&w=majority'

mongoose.connect(db, {useNewUrlParser: true }, err => {
	if(err){
		console.error("Error! " + err)
	}
	else{
		console.log('Connected to mongoDB')
	}
})

router.get('/', (req, res) => {
	res.send('from API route')
})

router.post('/register', (req, res) =>{
	let userData = req.body
	let user = new User(userData)
	user.save((error, registeredUser) =>{
		if(error){
			console.log(error)
		}
		else{
			res.status(200).send(registeredUser)
		}
	})
})

module.exports = router