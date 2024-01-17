import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'

import Swal from 'sweetalert2'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Mutation from '../graphql/mutations'
import {GQLClient} from '../helpers'

import '../index.css'

const RegisterPage = () => {
    const [isRedirected, setIsRedirected] = useState(false)

    if (isRedirected) {
        return <Redirect to="/login"/>
    }

    return (
        <Container className='form-max-width'>
            <h3>Register Page</h3>
            <Card>
                <Card.Header>User Details</Card.Header>

                <Card.Body>
                    <RegisterFormCustomer setIsRedirected={setIsRedirected}/>
                </Card.Body>
            </Card>
        </Container>
    )
}

const RegisterFormCustomer = ({setIsRedirected}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)

    const register = (e) => {
        e.preventDefault()

        let variables = {name, email, password} //name: name can be name only if they are spelled the same

        GQLClient({}).request(Mutation.addUser, variables).then(data => {
            const userAdded = data.addUser

            if (userAdded) {
                Swal.fire('Registration Successful', 'You will now be redirected to the Login Page', 'success'
                ).then(() => {
                    setIsRedirected(true)
                })
            } else {
                Swal.fire('Registration failed, The server encountered an error', 'error')
            }

            /*if (userAdded) {
                Swal.fire({
                    title: 'Registration Successful',
                    text: 'You will now be redirected to the Login Page',
                    type: 'success'
                }).then(() => {
                    setIsRedirected(true)
                })
            } else {
                title: 'Registration Failed',
                text: 'The server encoutered an error',
                type: 'error'
            }*/
        })
    }

    const checkPassword = (password) => {
        setPassword(password)

        if (password.length >= 7) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }

    return (
        <Form onSubmit={(e) => register(e)}>
            <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => checkPassword(e.target.value)}/>
            </Form.Group>
            <Button type="submit" variant="success" disabled={isDisabled} className="mr-2">Register</Button>&nbsp;
            <Button type="button" variant="danger">Cancel</Button>
        </Form>
    )
}

export default RegisterPage