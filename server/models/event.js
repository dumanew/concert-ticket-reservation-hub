const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
	name:{
		type: String,
		required: true
	}, 
	description: {
		type: String,
		required: true
	},
	eventDate: {
		type: String,
		required: true
	},
	runtime: {
		type: Number,
		required: true
	},
	ticketPrice: {
		type: Number,
		required: true
	},
	genre: {
		type: String,
		required: true
	},
	artist: {
		type: String,
		required: true
	},
	venue: {
		type: String,
		required: true
	},
	company: {
		type: String,
		required: true
	},
	imageLocation: {
		type: String,
		required: true
	},
	isArchived: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('event', eventSchema)