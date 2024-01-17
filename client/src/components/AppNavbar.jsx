import React, {useContext} from 'react'
import UserContext from '../contexts/UserContext'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const AppNavbar = () => {
	const {user} = useContext(UserContext)
	let navigation

	if (user.token === null) {
		navigation = (
			<Nav className="ml-auto text-white">
				<Nav.Link href="/register">Register</Nav.Link>
				<Nav.Link href="/login">Login</Nav.Link>
			</Nav>
		) 
	} else {
		if (user.role === 'administrator') {
			navigation = (
				<React.Fragment>
					<Nav className="mr-auto">
						<Nav.Link href="/">Menu</Nav.Link>
					</Nav>
					
					<Nav className="ml-auto text-white">
						<Nav.Link href="/dashboard">Dashboard</Nav.Link>
						<Nav.Link href="/transactions">Transactions</Nav.Link>
						<Nav.Link href="/user-list">User List</Nav.Link>
						<Nav.Link href="/logout">Logout</Nav.Link>
					</Nav>
				</React.Fragment>
			)
		} else if (user.role === 'customer') {
			navigation = (
				<React.Fragment>
					<Nav className="mr-auto">
						<Nav.Link href="/">Menu</Nav.Link>
						
					</Nav>
					<Nav className="ml-auto text-white">
						<Nav.Link href="/cart">Cart</Nav.Link>
						<Nav.Link href="/history">History</Nav.Link>
						<Nav.Link href="/logout">Logout</Nav.Link>
					</Nav>
				</React.Fragment>
			)
		}  else if (user.role === 'representative') {
			navigation = (
				<React.Fragment>
					<Nav className="mr-auto">
						<Nav.Link href="/">Menu</Nav.Link>	
					</Nav>
					<Nav className="ml-auto text-white">
						<Nav.Link href="/dashboard">Dashboard</Nav.Link>
						<Nav.Link href="/logout">Logout</Nav.Link>
					</Nav>
				</React.Fragment>
			)
		}
	}

	return (
		<Navbar bg="dark" variant="dark" className="mb-3">
			<Navbar.Brand>Concert Reservation</Navbar.Brand>
			<Navbar.Collapse>
				{navigation}
			</Navbar.Collapse>
		</Navbar>
	)}

export default AppNavbar