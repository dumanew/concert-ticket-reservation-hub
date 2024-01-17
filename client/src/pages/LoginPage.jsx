import React, {useState, useContext} from 'react'
import {Redirect} from 'react-router-dom'
import UserContext from '../contexts/UserContext'

import Swal from 'sweetalert2'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Mutation from '../graphql/mutations'
import {GQLClient} from '../helpers'

import '../index.css'

const LoginPage = () => {
    const [isRedirected, setIsRedirected] = useState(false)

    if (isRedirected) {
      return <Redirect to='/' />
    }

    return (
       <Container className="form-max-width">
           <h3>Login Page</h3>
           <Card>
               <Card.Header>Login Information</Card.Header>
               <Card.Body>
                   <LoginForm setIsRedirected={setIsRedirected}/>
               </Card.Body>
           </Card>
       </Container>
    )
}

const LoginForm = ({setIsRedirected}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {setUser} = useContext(UserContext)

    const login = (e) => {
        e.preventDefault()

        let variables = {email: username, password}

        GQLClient({}).request(Mutation.login, variables).then(data => {
          const result = data.login

          if (result !== null) {
            localStorage.setItem('name', result.name)
            localStorage.setItem('role', result.role)
            localStorage.setItem('token', result.token)

            setUser({
              name: localStorage.getItem('name'),
              role: localStorage.getItem('role'),
              token: localStorage.getItem('token')
            })

            setIsRedirected(true)
          } else {
            Swal.fire({
              title: 'Login failed',
              text: 'Email or password is incorrect. Please try again.',
              type: 'error'
            })
          }
        })
    }

    return (
        <Form onSubmit={(e) => login(e)}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit" variant="success">Login</Button>
        </Form>
    )
}

export default LoginPage