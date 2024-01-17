const Query = {
  	getArtists: `
		{
			getArtists {
				id
                name
                description
                debutYear
                company
                genre
              	
			}
		}
    `,
    getArtist: `
		query (
			$id: String!
		) {
			getArtist (
				id: $id
			) {
				name
				description
				debutYear
				company
				genre
				
			}
		}
    `,
  	getCompanies: `
		{
			getCompanies {
				id
                name
                description
                address
                
			}
		}
    `,
    getCompany: `
		query (
			$id: String!
		) {
			getCompany (
				id: $id
			) {
				name
				description
				address
				
			}
		}
    `,
  	getEvents: `
		{
			getEvents {
				id
                name
                description
                eventDate
                runtime
				ticketPrice
                genre
                artist
                venue
                company
                imageLocation
			}
		}
    `,
    getEvent: `
		query (
			$id: String!
		) {
			getEvent (
				id: $id
			) {
                name
                description
                eventDate
                runtime
				ticketPrice
                genre
                artist
                venue
                company
			}
		}
    `,
  	getGenres: `
		{
			getGenres {
				id
                name
                
			}
		}
    `,
    getGenre: `
		query (
			$id: String!
		) {
			getGenre (
				id: $id
			) {
				name

			}
		}
    `,
  	getVenues: `
		{
			getVenues {
				id
                name
                address
                capacity
			}
		}
    `,
    getVenue: `
		query (
			$id: String!
		) {
			getVenue (
				id: $id
			) {
				name
				address
				capacity
			}
		}
    `
}

export default Query;
