const Mutation = {
    login: `
        mutation (
            $email: String!,
            $password: String!
        ) {
            login (
                email: $email,
                password: $password
            ) {
                name
                role
                token
            }
        }
    `,
    addUser: `
        mutation (
            $name: String!,
            $email: String!,
            $password: String!
        ) {
            addUser (
                name: $name, 
                email: $email,
                password: $password
            )
        }
    `,
    addArtist: `
        mutation (
            $name: String!,
            $description: String!,
            $debutYear: String!
            $genre: String!
            $company: String!
            $base64EncodedImage: String!
        ) {
            addArtist (
                name: $name,
                description: $description,
                debutYear: $debutYear,
                genre: $genre,
                company: $company,
                base64EncodedImage: $base64EncodedImage
            )
        }
    `,
    addCompany: `
        mutation (
            $name: String!,
            $description: String!,
            $address: String!
            $base64EncodedImage: String!
        ) {
            addCompany (
                name: $name,
                description: $description,
                address: $address,
                base64EncodedImage: $base64EncodedImage
            )
        }
    `,
    addEvent: `
        mutation (
            $name: String!,
            $description: String!,
            $eventDate: String!
            $runtime: Float!
            $ticketPrice: Float!
            $artist: String!
            $genre: String!
            $venue: String!
            $company: String!
            $base64EncodedImage: String!
        ) {
            addEvent (
                name: $name,
                description: $description,
                eventDate: $eventDate,
                runtime: $runtime,
                ticketPrice: $ticketPrice,
                artist: $artist,
                genre: $genre,
                venue: $venue,
                company: $company,
                base64EncodedImage: $base64EncodedImage
            )
        }
    `,
    deleteEvent: `
        mutation (
            $id: String!
        ) {
            deleteEvent (
                id: $id
            )
        }
    `,
    addGenre: `
        mutation (
            $name: String!,
            $base64EncodedImage: String!
        ) {
            addGenre(
                name: $name,
                base64EncodedImage: $base64EncodedImage
            )
        }
    `,
    addVenue: `
        mutation (
            $name: String!,
            $address: String!,
            $capacity: Float!,
            $base64EncodedImage: String!
        ) {
            addVenue(
                name: $name,
                address: $address,
                capacity: $capacity,
                base64EncodedImage: $base64EncodedImage
            )
        }
    `
}

export default Mutation