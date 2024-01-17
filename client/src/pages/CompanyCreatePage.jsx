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

const CompanyCreatePage = (props) => {
    const [isRedirected, setIsRedirected] = useState(false)

    if (isRedirected) {
        return <Redirect to='/' />
    }

    return (
        <Container className="form-max-width">
            <h3>Create Company Page</h3>
            <CompanyCreateForm setIsRedirected={setIsRedirected} />
        </Container>
    )
}

const CompanyCreateForm = ({setIsRedirected}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const fileRef = React.createRef()

    const createCompany = (e) => {
        e.preventDefault()

        toBase64(fileRef.current.files[0]).then((encodedFile) => { //file in helper is converted as string
            let variables = {
                name, //name: name can be name only if they are spelled the same
                description,
                address,
                base64EncodedImage: encodedFile
            }

            GQLClient({}).request(Mutation.addCompany, variables)
                .then(data => {
                    if (data.addCompany) {
                        Swal.fire('Company Added', 'You will be redirected to the menu after closing this message', 'success').then(() => {
                            setIsRedirected(true)
                        })
                    } else {
                        Swal.fire('Company Add Failed', 'The server encoutered an error', 'error')
                    }
                })
        })//.catch((err) => {})catches error in helpers (reject)    
    }

    return (
        <Form onSubmit={(e) => createCompany(e)}>
            <Form.Group>
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
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

export default CompanyCreatePage