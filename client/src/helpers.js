import {GraphQLClient} from 'graphql-request'

const NodeServerURL = 'http://localhost:4000/'

const GQLServerURL = 'http://localhost:4000/graphql'

const GQLClient = (options) => {
    return new GraphQLClient(GQLServerURL, options)
}

const toBase64 = (file) => new Promise((resolve, reject) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = () => resolve(reader.result)
	reader.onerror = (error) => reject(error)
})

export {
	NodeServerURL, 
	GQLClient, 
	toBase64
}