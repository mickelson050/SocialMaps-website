const mongoose = require('mongoose')

const Schema = mongoose.Schema
const text_postSchema = new Schema({
	_id:Schema.Types.ObjectId,
	user: String,
	username: String,
	lat: String,
	lon: String,
	content: String,
	public: String

})

module.exports = mongoose.model('text_posts', text_postSchema, 'text_posts') 