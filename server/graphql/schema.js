const {gql} = require('apollo-server-express')

// Whatever schema is defined in the server is the only thing the client can access
module.exports = gql `
	type Query {
		getArtists: [Artist]
		getArtist (id: String!): Artist 
		
		getCompanies: [Company]
		getCompany (id: String!): Company

		getEvents: [Event]
		getEvent (id: String!): Event

		getGenres: [Genre]
		getGenre (id: String!): Genre

		getVenues: [Venue]
		getVenue (id: String!): Venue

		getCartItems: [Cart]
		getTransactions: [Order]
	}

	type Mutation {
		login (
			email: String! 
			password: String!
		): User

		addUser (
			name: String!, 
			email: String!, 
			password: String!
		): Boolean

		addArtist (
			name: String!, 
			description: String!, 
			debutYear: String!, 
			company: String!, 
			genre: String!, 
			base64EncodedImage: String!
		): Boolean
		editArtist (
			id: String!, 
			name: String!, 
			description: String!, 
			debutYear: String!, 
			company: String!, 
			genre: String!, 
			base64EncodedImage: String!
		): Boolean
		deleteArtist (id: String!): Boolean

		addCompany (
			name: String!,  
			description: String!, 
			address: String!,
			base64EncodedImage: String!
		): Boolean
		editCompany (
			id: String!, 
			name: String!, 
			description: String!, 
			address: String!
			base64EncodedImage: String!
		): Boolean
		deleteCompany (id: String!): Boolean

		addEvent (
			name: String!, 
			description: String!, 
			eventDate: String!, 
			runtime: Float!, 
			ticketPrice: Float!, 
			artist: String!, 
			genre: String!, 
			venue: String!, 
			company: String!, 
			base64EncodedImage: String!
		): Boolean
		editEvent (
			id: String!, 
			name: String!, 
			description: String!, 
			eventDate: String!, 
			runtime: Float!, 
			ticketPrice: Float!, 
			artist: String!, 
			genre: String!, 
			venue: String!, 
			company: String!, 
			base64EncodedImage: String!
		): Boolean
		deleteEvent (id: String!): Boolean

		addGenre (
			name: String!,
			base64EncodedImage: String!
		): Boolean
		editGenre (
			id: String!, 
			name: String!,
			base64EncodedImage: String!
		): Boolean
		deleteGenre (id: String!): Boolean

		addVenue (
			name: String!, 
			address: String!, 
			capacity: Float!,
			base64EncodedImage: String! 
		): Boolean
		editVenue (
			id: String!, 
			name: String!, 
			address: String!, 
			capacity: Float!,
			base64EncodedImage: String!
		): Boolean
		deleteVenue (id: String!): Boolean

		addToCart (
			eventId: String, 
			quantity: Int!
		): Boolean
		emptyCart: Boolean
		
		updateCartItem (
			eventId: String!, 
			quantity: Int!
		): Boolean
		deleteCartItem (eventId: String!): Boolean

		checkout (paymentMode: String!): Boolean

	}

	type Genre {
		id: ID!
		name: String!
		base64EncodedImage: String!
	}

	type Company {
		id: ID!
		name: String!
		description: String! 
		address: String!
		base64EncodedImage: String!
	}

	type Venue {
		id: ID!
		name: String!
		address: String!
		capacity: Float!
		base64EncodedImage: String!
	}

	type PaymentMode {
		id: ID!
		name: String!
	}

	type Artist {
		id: ID!
		name: String!
		description: String!
		debutYear: String!
		company: String!
		genre: String!
		base64EncodedImage: String!
	}

	type Event {
		id: ID!
		name: String!
		description: String!
		eventDate: String!
		runtime: Float!
		ticketPrice: Float!
		artist: String!
		genre: String!
		venue: String!
		company: String!
		imageLocation: String!
	}

	type OrderItem {
		name: String!
		ticketPrice: Float!
		quantity: Int!
	}

	type Order {
		id: ID!
		userId: String!
		totalPrice: Float!
		orderDate: String!
		events: [OrderItem!]
	}

	type Cart {
		id: ID!
		eventId: String!
		quantity: Int!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		role: String!
		stripeCustomerId: String!
		token: String
		cart: [Cart]
	}
`