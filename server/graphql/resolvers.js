const bcrypt = require('bcrypt')
const auth = require('../jwt-auth')
const fs = require('fs') //part of Node.js program
const uuid = require('uuid/v1')

const Artist = require('../models/artist')
const Company = require('../models/company')
const Event = require('../models/event')
const Genre = require('../models/genre')
const PaymentMode = require('../models/payment-mode')
const User = require('../models/user')
const Venue = require('../models/venue')

module.exports = {
	Query: {
		getArtists: (parent, args) => {
			return Artist.find({isArchived: false})
		},
		getArtist: (parent, args) => {
			return Artist.findById(args.id)
		},
		getCompanies: (parent, args) => {
			return Company.find({isArchived: false})
		},
		getCompany: (parent, args) => {
			return Company.findById(args.id)
		},
		getEvents: (parent, args) => {
			return Event.find({isArchived: false})
		},
		getEvent: (parent, args) => {
			return Event.findById(args.id)
		},
		getGenres: (parent, args) => {
			return Genre.find({})
		},
		getGenre: (parent, args) => {
			return Genre.findById(args.id)
		},
		getVenues: (parent, args) => {
			return Venue.find({})
		},
		getVenue: (parent, args) => {
			return Venue.findById(args.id)
			/*return Item.find({id: args.id})*/
		},
		getCartItems: (parent, args, context) => {
			return Event 
		},
		getTransactions: (parent, args, context) => {

		}
	},
	Mutation: {
		login: (parent, args) => {
			let query = User.findOne({email: args.email})

			return query.then((user) => user).then((user) => {
				if (user === null) {return null}

				let isPasswordMatched = bcrypt.compareSync(args.password, user.password)

				if (isPasswordMatched) {
					user.token = auth.createToken(user.toObject())
					return user
				} else {
					return null
				}
			})
		},
		addUser: (parent, args) => {
			let user = new User({
				name: args.name,
				email: args.email,
				password: bcrypt.hashSync(args.password, 10),
				role: 'customer',
				stripeCustomerId: 'DEFAULT_ID'
			})
			return user.save().then((user) => {
				return (user) ? true : false
			})
		},
		addArtist: (parent, args) => {
			console.log(args.base64EncodedImage)

			let base64Image = args.base64EncodedImage.split(';base64,').pop()
			let imageLocation = 'images/artists/' + uuid() + '.png'

			fs.writeFile(imageLocation, base64Image, {encoding: 'base64'}, (err) => {}) //location where to write, what to write, how to write, error

			let artist = new Artist({
				name: args.name,
				description: args.description,
				debutYear: args.debutYear,
				genre: args.genre,
				company: args.company,
				imageLocation
				//imageLocation //remains as imageLocation because it's like that in the schema
			})
			return artist.save().then((artist) => {
				return (artist) ? true : false
			})
		}, 
		editArtist: (parent, args) => {
			/*let artist = {}
			artist.name = args.name
			artist.description = args.description
			artist.debutYear = args.debutYear
			artist.company = args.company
			artist.genre = args.genre
			imageLocation: 'DEFAULT_ID'

			return Artist.findOneAndUpdate(
				{_id: args.id},
				artist,
				{new: true},
				function(error, editedArtist) {
					return editedArtist
				}
			)*/
		},
		deleteArtist: (parent, args) => {
			let condition = {_id: args.id}
			let updates = {isArchived: true}

			return Artist.findOneAndUpdate(condition, updates)
			.then((artist, err) => {
				return (err) ? false : true
			})
		},
		addCompany: (parent, args) => {
			console.log(args.base64EncodedImage)

			let base64Image = args.base64EncodedImage.split(';base64,').pop()
			let imageLocation = 'images/companies/' + uuid() + '.png'

			fs.writeFile(imageLocation, base64Image, {encoding: 'base64'}, (err) => {}) //location where to write, what to write, how to write, error

			let company = new Company ({
				name: args.name,
				description: args.description,
				address: args.address,
				imageLocation
				//imageLocation //remains as imageLocation because it's like that in the schema
			})
			return company.save().then((company) => {
				return (company) ? true : false
			})
		}, 
		editCompany: (parent, args) => {

		},
		deleteCompany: (parent, args) => {
			let condition = {_id: args.id}
			let updates = {isArchived: true}

			return Company.findOneAndUpdate(condition, updates)
			.then((company, err) => {
				return (err) ? false : true
			})
		},
		addEvent: (parent, args) => {
			console.log(args.base64EncodedImage)

			let base64Image = args.base64EncodedImage.split(';base64,').pop()
			let imageLocation = 'images/events/' + uuid() + '.png'

			fs.writeFile(imageLocation, base64Image, {encoding: 'base64'}, (err) => {}) //location where to write, what to write, how to write, error

			let event = new Event({
				name: args.name,
				description: args.description,
				eventDate: args.eventDate,
				runtime: args.runtime,
				ticketPrice: args.ticketPrice,
				artist: args.artist,
				genre: args.genre,
				venue: args.venue,
				company: args.company,
				imageLocation
				//imageLocation //remains as imageLocation because it's like that in the schema
			})
			return event.save().then((event) => {
				return (event) ? true : false
			})
		}, 
		editEvent: (parent, args) => {

		},
		deleteEvent: (parent, args) => {
			let condition = {_id: args.id}
			let updates = {isArchived: true}

			return Event.findOneAndUpdate(condition, updates)
			.then((event, err) => {
				return (err) ? false : true
			})
		},
		addGenre: (parent, args) => {
			console.log(args.base64EncodedImage)

			let base64Image = args.base64EncodedImage.split(';base64,').pop()
			let imageLocation = 'images/genres/' + uuid() + '.png'

			fs.writeFile(imageLocation, base64Image, {encoding: 'base64'}, (err) => {}) //location where to write, what to write, how to write, error

			let genre = new Genre ({
				name: args.name,
				imageLocation
				//imageLocation //remains as imageLocation because it's like that in the schema
			})
			return genre.save().then((genre) => {
				return (genre) ? true : false
			})
		}, 
		editGenre: (parent, args) => {

		},
		deleteGenre: (parent, args) => {
			let condition = {_id: args.id}
			let updates = {isArchived: true}

			return Genre.findOneAndUpdate(condition, updates)
			.then((genre, err) => {
				return (err) ? false : true
			})
		},
		addVenue: (parent, args) => {
			console.log(args.base64EncodedImage)

			let base64Image = args.base64EncodedImage.split(';base64,').pop()
			let imageLocation = 'images/venues/' + uuid() + '.png'

			fs.writeFile(imageLocation, base64Image, {encoding: 'base64'}, (err) => {}) //location where to write, what to write, how to write, error

			let venue = new Venue ({
				name: args.name,
				address: args.address,
				capacity: args.capacity,
				imageLocation
				//imageLocation //remains as imageLocation because it's like that in the schema
			})
			return venue.save().then((venue) => {
				return (venue) ? true : false
			})
		}, 
		editVenue: (parent, args) => {

		},
		deleteVenue: (parent, args) => {
			let condition = {_id: args.id}
			let updates = {isArchived: true}

			return Venue.findOneAndUpdate(condition, updates)
			.then((venue, err) => {
				return (err) ? false : true
			})
		}
	}
}