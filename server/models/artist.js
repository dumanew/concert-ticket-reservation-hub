const mongoose = require('mongoose')
const Schema = mongoose.Schema

const artistSchema = new Schema({
	name:{
		type: String,
		required: true
	}, 
	description: {
		type: String,
		required: true
	},
	debutYear: {
		type: String,
		required: true
	},
	company: {
		type: String,
		required: true
	},
	genre: {
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

module.exports = mongoose.model('artist', artistSchema)