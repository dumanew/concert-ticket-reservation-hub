const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const {ApolloServer} = require('apollo-server-express') //{} - object destructuring
const gqlSchema = require('./graphql/schema')
const gqlResolvers = require('./graphql/resolvers')

const app = express()

app.use(bodyParser.json({limit: '25mb'}))
app.use('/images', express.static('images'))

const apolloServer = new ApolloServer({
	typeDefs: gqlSchema,
	resolvers: gqlResolvers
})

apolloServer.applyMiddleware({app, path: '/graphql'})

mongoose.connect('mongodb+srv://admin:adminadmin@csp3-gu4sx.mongodb.net/csp3?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
	console.log('Now connected to MongoDB Atlas server.')
})

/*app.get('/users/list', (req, res) => {
	return res.json({id: 1, name: 'batch45'})
})
*/
app.listen({port: 4000}, () => {
	console.log('Express server now running.')
})