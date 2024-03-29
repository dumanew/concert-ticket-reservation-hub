const mongoose = require('mongoose')
const Schema = mongoose.Schema

const genreSchema = new Schema({
	name: {
		type: String, 
		required: true
	},
	imageLocation: {
		type: String,
		required: false
	},
	isArchived: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('genre', genreSchema)