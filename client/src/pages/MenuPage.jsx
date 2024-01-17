import React, {useState, useEffect, useContext} from 'react'
import UserContext from '../contexts/UserContext'

import Swal from 'sweetalert2'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import Query from '../graphql/queries'
import Mutation from '../graphql/mutations'
import {GQLClient, NodeServerURL} from '../helpers'

const MenuPage = (props) => {
    const [events, setEvents] = useState([])
    
    const {user} = useContext(UserContext)

    const btnAddEvent = <Button variant="success" href="/event-create">Add Event</Button>

    useEffect(() => {
    	GQLClient({}).request(Query.getEvents, null).then(({getEvents}) => {
			setEvents(getEvents.map((event) =>  <EventCatalog event = {event} />))
        })
    }, [])
        /*GQLClient({}).request(Query.getItems, null).then((data) => {
        	let MenuItems = data.getItems.map((item) => {
        		return <MenuItem item = {item} />
        	})
        	setItems(MenuItems)*/

    return (
        <Container fluid>
            <h3>Menu Page {(user.role === 'administrator') ? btnAddEvent : null}</h3>
            <Row>
                {events}
            </Row>
        </Container>
    )
}

const EventCatalog = ({event}) => {
    const {user} = useContext(UserContext)
    let btnEventActions = ''

    if (user.role === 'administrator') {
        btnEventActions = (
            <div className="d-flex flex-column mt-3">
                <ButtonGroup>
                    <Button variant="info" href={"/event-edit/" + event.id}>Edit</Button>
                    <Button variant="danger" href={"/event-delete/" + event.id}>Delete</Button>
                </ButtonGroup>
            </div>
        )
    } else if (user.role === 'customer') {
        btnEventActions = (
            <CartAddForm eventId={event.id}/>
        )
    }

    return (
        <Col md={3}>
            <Card className="h-100">
                <img style={{objectFit: "cover", height: "400px", width: "100%"}} src={NodeServerURL + event.imageLocation}/>
                <Card.Body>
                    <span><strong>{event.name}</strong> ({event.artist})</span><br/>
                    <span>{event.description}</span><br/>
                    <span>&#8369; {event.ticketPrice}</span><br/>
                    {btnEventActions}
                </Card.Body>
            </Card>
        </Col>
    )
}

const CartAddForm = ({eventId}) => {
    const[quantity, setQuantity] = useState(0)

    const addToCart = (e) => {
        e.preventDefault()
    }

    return (
        <Form onSubmit={(e) => addToCart(e)}>
            <InputGroup>
                <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1"/>
                <Button type="submit" variant="success">Add</Button>
            </InputGroup>
        </Form>
    )
}

export default MenuPage