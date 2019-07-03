const mongoose = require('mongoose')

const Schema = mongoose.Schema
const testModel = new Schema({
	test: {
		objectTest: String,
		Objecttest2: String
	},
	moreObjects : String
})

module.exports = mongoose.model('testmodel', testModel, 'testmodel') 