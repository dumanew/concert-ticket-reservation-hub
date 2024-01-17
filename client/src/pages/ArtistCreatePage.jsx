import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import Swal from 'sweetalert2'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Query from '../graphql/queries'
import Mutation from '../graphql/mutations'
import {GQLClient, toBase64} from '../helpers'

import '../index.css'

const ArtistCreatePage = (props) => {
    const [isRedirected, setIsRedirected] = useState(false)

    if (isRedirected) {
        return <Redirect to='/' />
    }

    return (
        <Container className="form-max-width">
            <h3>Create Artist Page</h3>
            <ArtistCreateForm setIsRedirected={setIsRedirected} />
        </Container>
    )
}

const ArtistCreateForm = ({setIsRedirected}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [debutYear, setDebutYear] = useState('')
    const [genre, setGenre] = useState(undefined)
    const [genres, setGenres] = useState([])
    const [company, setCompany] = useState('')
    const fileRef = React.createRef()

    useEffect(() => {
        GQLClient({}).request(Query.getGenres, null).then((data) => {
            let options = data.getGenres.map((genre) => {
                return <option key={genre.id} value={genre.name}>{genre.name}</option>
            })
            setGenres(options)
        })
    }, []) //runs once only

    const createArtist = (e) => {
        e.preventDefault()

        toBase64(fileRef.current.files[0]).then((encodedFile) => { //file in helper is converted as string
            let variables = {
                name, //name: name can be name only if they are spelled the same
                description,
                debutYear,
                genre,
                company,
                base64EncodedImage: encodedFile
            }

            GQLClient({}).request(Mutation.addArtist, variables)
                .then(data => {
                    if (data.addArtist) {
                        Swal.fire('Artist Added', 'You will be redirected to the menu after closing this message', 'success').then(() => {
                            setIsRedirected(true)
                        })
                    } else {
                        Swal.fire('Artist Add Failed', 'The server encoutered an error', 'error')
                    }
                })
        })//.catch((err) => {})catches error in helpers (reject)    
    }

    return (
        <Form onSubmit={(e) => createArtist(e)}>
            <Form.Group>
                <Form.Label>Artist Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Debut Year</Form.Label>
                <Form.Control type="text" value={debutYear} onChange={(e) => setDebutYear(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Genre</Form.Label>
                <Form.Control as="select" name={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value selected disabled>Select A Genre</option>
                    {genres}
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" value={company} onChange={(e) => setCompany(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" className="form-control" ref={fileRef} accept="image/png, image/gif, image/jpeg" />
            </Form.Group>
            <Button type="submit" variant="success">Create</Button>&nbsp;
            <Button type="button" variant="danger">Cancel</Button>
        </Form>
    )
}

export default ArtistCreatePage