const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const crypto = require('crypto')

const User = require('../models/user')
const NpUser = require('../models/npUser')
const TextPost = require('../models/text_post')

//**************************//
//***Database Connection***//
//**************************//
const mongoose = require('mongoose')
const db = 'mongodb+srv://AuthUser:BVSQScwj2Vffiv@authdb-a9deu.mongodb.net/SocialMaps?retryWrites=true&w=majority'
mongoose.set('useFindAndModify', false);
mongoose.connect(db, {useNewUrlParser: true }, err => {
	if(err){
		console.error("Error! " + err)
	}
	else{
		console.log('Connected to mongoDB')
	}
})

/*
* Function: veryfiToken:
* Description: verifies localy stored JWT token. Sending 401 Unauthoized request messages on falsified or nonexistant token
*/
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

/*
* Routing: mobileVerifyToken:
* Description: verifies localy stored JWT token on mobile. Sending 401 Unauthoized request messages on falsified or 
* nonexistant token
*/
router.post('/mobileVerifyToken', (req, res, next) =>{
	if(!req.body.token){
		return res.status(401).send("Unauthorized request")
	}
	let token = req.body.token
	try {
		let payload = jwt.verify(token, 'secretKey');
		req.userId = payload.subject
		res.send("goodToken")
	} 
	catch (error) {
		// console.log(error)
		return  res.send("badToken")
	}
})

//Default route to server, sends welcome message
router.get('/', (req, res) => {
	res.send('from API route')
})

/*
* Route: register
* Description: Route for registration. Checks if an email to be registered already exists, then registers or refuses request
* Requires: At least an email, extra details handled via userScheme
*/
router.post('/register', (req, res) =>{
	let userData = req.body

	User.findOne({email: userData.email}, (error, user) =>{
		if(error){
			// and error has occured
			res.send(false)
		}
		else if(user) {
			//user already exists
			res.send("emailAlreadyExists")
		}
		else{
			User.findOne({username: userData.username}, (error, user) =>{
				if(error){
					// and error has occured
					res.send(false)
				}
				else if(user) {
					//user already exists
					res.send("usernameAlreadyExists")
				}
				else{
					// if user doesn't already exist
					let hash = crypto.createHash('md5').update(userData.password).digest("hex")
					userData.password = hash
					let user = new User(userData)
					user.save((error, registeredUser) =>{
						if(error){
							console.log(error)
						}
						else{

							let userObject = user
							let payload = { subject: registeredUser._id }
							let token = jwt.sign(payload, 'secretKey')
							res.status(200).send({token, userObject})
						}
					})
				}
			})	
		}
	})
})

/*
* Route: login
* Description: Route for login. Checks if an email exists. Checks send data to db data and returns JWT token.
*/
router.post('/login', (req, res)=>{
	let userData = req.body
	let hash = crypto.createHash('md5').update(userData.password).digest("hex")
	userData.password = hash
	// console.log(userData.password)
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
				let userObject = user
				let payload = { subject: user._id }
				let token = jwt.sign(payload, 'secretKey')
				res.status(200).send({token, userObject})
			}
		}
	})
})

/*
* Route: findPerson
* Description: Route to findPerson. returns a list of everyone you search
*/
router.post('/findPerson', (req, res) =>{
	let userData = req.body
	User.find({username: {$regex: '.*' + userData.username + '.*' }}, function(err, userList) {
		if(err){
			console.log(err)
		}
		else{
<<<<<<< HEAD
			if(userList.length == 0){
				res.send("nothingFound")
			}
			else{
				userArray = {}
				let i = 0;
				for(user of userList){
					userArray[i] = user.username
					i++
				}
				res.json(userArray)
			}
			
=======
			try{
				if(userList.length == 0){
					res.send("nothingFound")
				}
				else{
					userArray = {}
					let i = 0;
					for(user of userList){
						userArray[i] = user.username
						i++
					}
					res.json(userArray)
				}
			}
			catch(error){
				res.send("nothingFound")
			}
		}
	})
})

/*
* Route: profileUser
* Description: Route to profileUser. returns nonprivate data of 1 person
# Note: Username has to be specific
*/
router.post('/profileUser', (req, res) =>{
	let userData = req.body
	NpUser.find({username:  userData.username}, function(err, user) {
		if(err){
			console.log(err)
		}
		else{
			try{
				if(user.length == 0){
					
					res.send("nothingFound")
				}
				else{
					res.json(user)
				}
			}
			catch(error){
				
				res.send("nothingFound")
			}
>>>>>>> master
		}
	})
})

/*
* Route: follow
* Description: Route to add followers. pushes someone to follow to array of people you follow
*/
router.post('/follow', (req, res)=>{
	let userData = req.body
	User.findOneAndUpdate({username: userData.username}, {$push: {following : userData.follow}}, (err, user)=>{
		if(err){
			console.log(err)
		}
		else{
			console.log("succesfully followed")
			res.send("Ok")
		}
	})
})

/*
* Route: unfollow
* Description: Route to remove followers. pulls someone who follows out of array
*/
router.post('/unfollow', (req, res)=>{
	let userData = req.body
	User.findOneAndUpdate({username: userData.username}, {$pull: {following : userData.unfollow}}, (err, user)=>{
		if(err){
			console.log(err)
		}
		else if(!user){
			res.send("noUserFound")
		}
		else{
			console.log("succesfully unfollowed")
			res.send("Ok")
		}
	})
})

/*
* Route: getFollowers
* Description: Route to getFollowers. returns a list of everyone you follow
*/
router.post('/getFollowers', (req, res)=>{
	let userData = req.body
	//console.log(userData)
	User.findOne({username: userData.username}, (err, user)=>{
		if(err){
			console.log(err)
		}
		else{
			try{
				if(user.following.length ==0){
					res.send("noFollowersFound")
				}
				else{
					res.json(user.following)
					
				}
			}
			catch(error){
				res.send("noFollowersFound")
			}
		}
	})
})

/*
* Route: getFollowerPosts
* Description: Route to getFollowerPosts. returns a list of all posts from everyone you follow
*/
router.post('/getFollowerPosts', (req, res) =>{
	let data = req.body
	let followedData = {}
	let i = 0
	let j = 0
	User.findOne({username: data.username}, (err, user)=>{
		if(err){
			console.log(err)
		}
		else{
			try{
				if(!user.following){
					res.send("noFollowersFound")
				}
				else if(user.following.length ==0){
					res.send("noFollowersFound")
				}
				else{
					// $in has the list of everyone you follow, handles the request on db
					TextPost.find({username: {$in: user.following}}, (err, data)=>{
						if(err){
							console.log(err)
						}
						else{
							try{
								if(data.length == 0){
									res.json("noPostsFound")

								}
								else{
									res.json(data)

								}
								
							}
							catch(error){
								console.log("ERROR ==" +error)
								res.json("noPostsFound")
							}
						}
					})
						
				}
				
			}
			catch(error){
				console.log(error)
				res.send("noFollowersFound")
			}
		}
	})
})

/*
* Route: getMyPosts
* Description: Route to getMyPosts. returns a list of all your your posts
* Note: sends back posts from username, so this can be used to get posts from other people
*/
router.post('/getMyPosts', (req, res)=>{
	let data = req.body
	TextPost.find({username: data.username}, (err, data)=>{
		if(err){
			console.log(err)
		}
		else{
			try{
				if(data.length == 0){
					res.send("nothingFound")
				}
				else{
					res.json(data)
				}
			}
			catch(error){
				res.send("Error:nothingFound")
			}
		}
	})
})

router.post('/delMyPost', (req, res)=>{
	let data = req.body
	TextPost.findOneAndRemove({_id: data.id}, (err)=>{
		if(err){
			console.log(err)
		}
		else{
			res.send("OK")
		}
	})

		// (err) =>{
		// if(err){
		// 	console.log(err)
		// }
		// else{
		// 	console.log("it worked..?")
		// }
	//})

})

<<<<<<< HEAD
router.post('/getFollowerPosts', (req, res) =>{
	let data = req.body
	User.findOne({username: data.username}, (err, user)=>{
		if(err){
			console.log(err)
		}
		else{

			if(user.following.length ==0){
				res.send("noFollowersFound")
			}
			else{
				let followedData = {}
				let i = 0
				for(followed of user.following){
					
					TextPost.find({username: followed}, (err, data)=>{
						if(err){
							console.log(err)
						}
						else{
							// console.log(" For data : " + data)
							for(individuals of data){
								console.log('individual Data: ' + individuals)
								followedData[i] = individuals
								i++
							}
							console.log("After Data "+ followedData)
							res.json(followedData)
							
						}
					})
				}
				
				
			}
		}
	})
})

router.post('/getMyPosts', (req, res)=>{
	let data = req.body
	TextPost.find({username: data.username}, (err, data)=>{
		if(err){
			console.log(err)
		}
		else{
			if(data.length == 0){
				res.send("nothingFound")
			}
			else{
				res.json(data)
			}
		}
	})
})


=======
>>>>>>> master

/*
* Route: getAllPosts
* Description: Route to getAllPosts. Returns a list of all posts
*/
router.post('/getAllPosts', (req, res) =>{
	let data = req.body

	TextPost.find({}, (error, posts) =>{
		if(error){
			console.log(error)
		}
		else{
			res.json(posts)
		}
	})
})

/*
* Route: new_text_post
* Description: Route to new_text_post. creates a new post.
*/
router.post('/new_text_post', (req, res) =>{
	let text_postData = req.body
	let textpost  = new TextPost(text_postData)
	textpost.save((error, newPost) =>{
		if(error){
			console.log(error)
		}
		else{
			res.json(newPost.user)
		}
	})
})


// ------ Routes only for verification ------ //
router.get('/kaart',verifyToken, (req, res) => {
	let kaart =[
	{

	}]
	console.log("Req: " + req.userId)
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