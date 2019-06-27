const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/user')
const TextPost = require('../models/text_post')

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

function verifyToken(req, res, next){
	if(!req.headers.authorization){
		return res.status(401).send("Unauthorized request")
	}
	let token = req.headers.authorization.split(' ')[1]
	if(token === 'null'){
		return res.status(401).send("Unauthorized request")
	}
	try {
		let payload = jwt.verify(token, 'secretKey');
		req.userId = payload.subject
		next();
	} 
	catch (error) {
		return  res.status(401).send("Unothorized request")
	}
}

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
			let payload = { subject: registeredUser._id }
			let token = jwt.sign(payload, 'secretKey')
			res.status(200).send({token})
		}
	})
})

router.post('/login', (req, res)=>{
	let userData = req.body

	User.findOne({email: userData.email}, (error, user) =>{
		if(error){
			console.log(error)
		}
		else{
			if(!user){
				res.status(401).send('Invalid Email')
			}
			else if(user.password !== userData.password){
				res.status(401).send('Invalid password')
			}
			else{
				let payload = { subject: user._id }
				let token = jwt.sign(payload, 'secretKey')
				res.status(200).send({token})
			}
		}
	})
})

router.post('/new_text_post', (req, res) =>{
	let text_postData = req.body
	let textpost  = new TextPost(text_postData)
	user.save((error, newPost) =>{
		if(error){
			console.log(error)
		}
		else{
			
		}
	})
})

router.get('/Kaart', verifyToken, (req, res) => {
	let kaart =[
	{
		
	}]
	res.json(kaart)
})

router.get('/friends',  verifyToken, (req, res) => {
	let friends =[
	{
		
	}]
	res.json(friends)
})

router.get('/mymessages',  verifyToken, (req, res) => {
	let mymessages =[
	{
		
	}]
	res.json(mymessages)
})


module.exports = router