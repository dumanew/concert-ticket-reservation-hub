const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentModeSchema = new Schema({
	name: String
})

module.exports = mongoose.model('payment_mode', paymentModeSchema)