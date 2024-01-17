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

const EventDeletePage = (props) => {
    const [isRedirected, setIsRedirected] = useState(false)

    if (isRedirected) {
        return <Redirect to='/' />
    }

    return (
        <Container className="form-max-width">
            <h3>Delete Event Page</h3>
            <EventDeleteForm eventId={props.match.params.id} setIsRedirected={setIsRedirected} />
        </Container>
    )
}

const EventDeleteForm = ({eventId, setIsRedirected}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [runtime, setRuntime] = useState(0)
    const [ticketPrice, setTicketPrice] = useState(0)
    const [artist, setArtist] = useState('')
    const [genre, setGenre] = useState(undefined)
    const [venue, setVenue] = useState(undefined)
    const [company, setCompany] = useState('')

    useEffect(() => {
        GQLClient({}).request(Query.getEvent, { id: eventId }).then((data) => {
            setName(data.getEvent.name)
            setDescription(data.getEvent.description)
            setEventDate(data.getEvent.eventDate)
            setRuntime(data.getEvent.runtime)
            setTicketPrice(data.getEvent.ticketPrice)
            setArtist(data.getEvent.artist)
            setGenre(data.getEvent.genre)
            setVenue(data.getEvent.venue)
            setCompany(data.getEvent.company)
        })
    }, []) //runs once only

    const deleteEvent = (e) => {
        e.preventDefault()

        GQLClient({}).request(Mutation.deleteEvent, { id: eventId }).then((data) => {
            if (data.deleteEvent) {
                Swal.fire('Event Deleted', 'You will be redirected to the menu after closing this message', 'success').then(() => {
                    setIsRedirected(true)
                })
            } else {
                Swal.fire('Event Delete Failed', 'The server encoutered an error', 'error')
            }
        })
    }

    return (
        <Form onSubmit={(e) => deleteEvent(e)}>
            <Form.Group>
                <Form.Label>Event Name</Form.Label>
                <Form.Control type="text" value={name} disabled />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={description} disabled />
            </Form.Group>
            <Form.Group>
                <Form.Label>Event Date</Form.Label>
                <Form.Control type="text" value={eventDate} disabled />
            </Form.Group>
            <Form.Group>
                <Form.Label>Runtime</Form.Label>
                <Form.Control type="number" value={runtime} disabled />
            </Form.Group>
            <Form.Group>
                <Form.Label>Ticket Price</Form.Label>
                <Form.Control type="number" value={ticketPrice} disabled />
            </Form.Group>
            <Form.Group>
                <Form.Label>Artist</Form.Label>
                <Form.Control type="text" value={artist} disabled />
            </Form.Group>
            <Form.Group>
                <Form.Label>Genre</Form.Label>
                <Form.Control type="text" value={genre} disabled />
            </Form.Group>
            <Form.Group>
                <Form.Label>Venue</Form.Label>
                <Form.Control type="text" value={venue} disabled />
            </Form.Group>
            <Form.Group>
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" value={company} disabled />
            </Form.Group>
            <Button type="submit" variant="danger">Delete</Button>&nbsp;
            <Button type="button" variant="warning">Cancel</Button>
        </Form>
    )
}

export default EventDeletePage