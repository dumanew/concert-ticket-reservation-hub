const mongoose = require('mongoose')
const Schema = mongoose.Schema

const venueSchema = new Schema({
	name:{
		type: String,
		required: true
	}, 
	address: {
		type: String,
		required: true
	},
	capacity: {
		type: Number,
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

module.exports = mongoose.model('venue', venueSchema)