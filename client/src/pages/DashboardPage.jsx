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
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'

import Query from '../graphql/queries'
import Mutation from '../graphql/mutations'
import {GQLClient, NodeServerURL} from '../helpers'

const DashboardPage = (props) => {
    const [artists, setArtists] = useState([])
    const [companies, setCompanies] = useState([])
    const [genres, setGenres] = useState([])
    const [venues, setVenues] = useState([])

    const {user} = useContext(UserContext)

    useEffect(() => {
        GQLClient({}).request(Query.getArtists, null).then(({getArtists}) => {
            setArtists(getArtists.map((artist) => <ArtistCatalog artist={artist} />))
        })
        GQLClient({}).request(Query.getCompanies, null).then(({getCompanies}) => {
            setCompanies(getCompanies.map((company) => <CompanyCatalog company={company} />))
        })
        GQLClient({}).request(Query.getGenres, null).then(({getGenres}) => {
            setGenres(getGenres.map((genre) => <GenreCatalog genre={genre} />))
        })
        GQLClient({}).request(Query.getVenues, null).then(({getVenues}) => {
            setVenues(getVenues.map((venue) => <VenueCatalog venue={venue} />))
        })
    }, [])

    const btnAddArtist = <Button variant="success" href={"/artist-create"}>Add Artist</Button>
    const btnAddCompany = <Button variant="success" href={"/company-create"}>Add Company</Button>
    const btnAddGenre = <Button variant="success" href={"/genre-create"}>Add Genre</Button>
    const btnAddVenue = <Button variant="success" href={"/venue-create"}>Add Venue</Button>

    return (
        <Container fluid className="h-100">
            <Row lg={12} className="h-100">
                <Col className="h-100">
                    <Table striped bordered hover responsive variant="dark">
                        <thead>
                            <th className='d-flex justify-content-between align-middle'>Artists {btnAddArtist}</th>
                        </thead>
                        <tbody>{artists}</tbody>
                    </Table>
                </Col>
                <Col className="h-100">
                    <Table striped bordered hover responsive variant="dark">
                        <thead>
                            <th className='d-flex justify-content-between align-middle'>Companies {btnAddCompany}</th> 
                        </thead>
                        <tbody>{companies}</tbody>       
                    </Table>
                </Col>
            </Row>
            <Row className="h-100">
                <Col className="h-100">
                    <Table striped bordered hover responsive variant="dark">
                        <thead>
                            <th className='d-flex justify-content-between align-middle'>Genres {btnAddGenre}</th>
                        </thead>
                        <tbody>{genres}</tbody>
                    </Table>
                </Col>
                <Col className="h-100">
                    <Table striped bordered hover responsive variant="dark">
                        <thead>
                            <th className='d-flex justify-content-between align-middle'>Venues {btnAddVenue}</th>
                        </thead>
                        <tbody>{venues} </tbody>   
                    </Table>
                </Col>
            </Row>
        </Container>  
    )
}

const ArtistCatalog = ({artist}) => {
    const {user} = useContext(UserContext)
    let btnArtistActions = ''

    if (user.role === 'administrator') {
        btnArtistActions = (
            <div>
                <ButtonGroup>
                    <Button variant='info'>Edit</Button>
                    <Button variant='danger'>Delete</Button>
                </ButtonGroup>
            </div>
        )
    } else if (user.role === 'representative') {
        btnArtistActions = (
            <div>
                <ButtonGroup>
                    <Button variant='info'>Edit</Button>
                </ButtonGroup>
            </div>
        )
    }

    return (
        <tr><td className='d-flex justify-content-between align-middle'>{artist.name}{btnArtistActions}</td></tr>      
    )
}

const CompanyCatalog = ({company}) => {
    const {user} = useContext(UserContext)
    let btnCompanyActions = ''

    if (user.role === 'administrator') {
        btnCompanyActions = (
            <div>
                <ButtonGroup>
                    <Button variant='info'>Edit</Button>
                    <Button variant='danger'>Delete</Button>
                </ButtonGroup>
            </div>
        )
    } else if (user.role === 'representative') {
        btnCompanyActions = (
            <div>
                <ButtonGroup>
                    <Button variant='info'>Edit</Button>
                </ButtonGroup>
            </div>
        )
    }

    return (
        <tr><td className='d-flex justify-content-between align-middle'>{company.name}{btnCompanyActions}</td></tr>
    )
}

const GenreCatalog = ({genre}) => {
    const {user} = useContext(UserContext)
    let btnGenreActions = ''

    if (user.role === 'administrator') {
        btnGenreActions = (
            <div>
                <ButtonGroup>
                    <Button variant='info'>Edit</Button>
                    <Button variant='danger'>Delete</Button>
                </ButtonGroup>
            </div>
        )
    }
    return (
        <tr><td className='d-flex justify-content-between align-middle'>{genre.name}{btnGenreActions}</td></tr>
    )
}

const VenueCatalog = ({venue}) => {
    const { user } = useContext(UserContext)
    let btnVenueActions = ''

    if (user.role === 'administrator') {
        btnVenueActions = (
            <div>
                <ButtonGroup>
                    <Button variant='info'>Edit</Button>
                    <Button variant='danger'>Delete</Button>
                </ButtonGroup>
            </div>
        )
    }
    return (
        <tr><td className='d-flex justify-content-between align-middle'>{venue.name}{btnVenueActions}</td></tr>
    )

}

export default DashboardPage