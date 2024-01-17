const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
	name: {
		type: String,
		required: true
	}, 
	description: {
		type: String,
		required: true
	}, 
	address: {
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

module.exports = mongoose.model('company', companySchema)