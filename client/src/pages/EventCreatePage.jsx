import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'

import Swal from 'sweetalert2'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Query from '../graphql/queries'
import Mutation from '../graphql/mutations'
import {GQLClient, toBase64} from '../helpers'

import '../index.css'

const EventCreatePage = (props) => {
    const [isRedirected, setIsRedirected] = useState(false)

    if (isRedirected) {
        return <Redirect to='/' />
    }

    return (
        <Container className="form-max-width">
           <h3>Create Event Page</h3>
           <EventCreateForm setIsRedirected={setIsRedirected} />
       </Container>
    )
}

const EventCreateForm = ({setIsRedirected}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [runtime, setRuntime] = useState(0)
    const [ticketPrice, setTicketPrice] = useState(0)
    const [artist, setArtist] = useState('')
    const [genre, setGenre] = useState(undefined)
    const [genres, setGenres] = useState([])
    const [venue, setVenue] = useState(undefined)
    const [venues, setVenues] = useState([])
    const [company, setCompany] = useState('')
    const fileRef = React.createRef()

    useEffect(() => {
        GQLClient({}).request(Query.getGenres, null).then((data) => {
            let options = data.getGenres.map((genre) => {
                return <option key={genre.id} value={genre.name}>{genre.name}</option>
            })
            setGenres(options)
        })
        GQLClient({}).request(Query.getVenues, null).then((data) => {
            let options = data.getVenues.map((venue) => {
                return <option key={venue.id} value={venue.name}>{venue.name}</option>
            })
            setVenues(options)
        })
    }, []) //runs once only

    const createEvent = (e) => {
        e.preventDefault()

        toBase64(fileRef.current.files[0]).then((encodedFile) => { //file in helper is converted as string
            let variables = {
                name, //name: name can be name only if they are spelled the same
                description, 
                eventDate,
                runtime: parseFloat(runtime),
                ticketPrice: parseFloat(ticketPrice), 
                artist,
                genre, 
                venue,
                company,
                base64EncodedImage: encodedFile
            }

            GQLClient({}).request(Mutation.addEvent, variables)
            .then(data => {
                if (data.addEvent) {
                    Swal.fire('Event Added', 'You will be redirected to the menu after closing this message', 'success').then(() => {
                        setIsRedirected(true)
                    })
                } else {
                    Swal.fire('Event Add Failed', 'The server encoutered an error', 'error')                    
                }
            })
        })//.catch((err) => {})catches error in helpers (reject)    
    }

    return (
        <Form onSubmit={(e) => createEvent(e)}>
            <Form.Group>
                <Form.Label>Event Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Event Date</Form.Label>
                <Form.Control type="text" value={eventDate} onChange={(e) => setEventDate(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Runtime</Form.Label>
                <Form.Control type="number" value={runtime} onChange={(e) => setRuntime(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Ticket Price</Form.Label>
                <Form.Control type="number" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Artist</Form.Label>
                <Form.Control type="text" value={artist} onChange={(e) => setArtist(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Genre</Form.Label>
                <Form.Control as="select" name={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value selected disabled>Select A Genre</option>
                    {genres}
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Venue</Form.Label>
                <Form.Control as="select" name={venue} onChange={(e) => setVenue(e.target.value)}>
                    <option value selected disabled>Select A Venue</option>
                    {venues}
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" value={company} onChange={(e) => setCompany(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" className="form-control" ref={fileRef} accept="image/png, image/gif, image/jpeg"/>
            </Form.Group>
            <Button type="submit" variant="success">Create</Button>&nbsp;
            <Button type="button" variant="danger">Cancel</Button>
        </Form>
    )
}

export default EventCreatePage