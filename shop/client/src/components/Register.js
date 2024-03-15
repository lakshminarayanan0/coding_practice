import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <Container fluid className='d-flex justify-content-center align-items-center bg-dark text-white flex-column' style={{minHeight:'100vh'}}>

   <h2>User Registration</h2>
    <Form className='border p-3 text-white'>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="tel" placeholder="Enter phone number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="warning" type="submit">
        Register
      </Button>
     <Form.Group>
     <Form.Text className='muted text-white'>Already a user?</Form.Text><Link to='/login' className=' ms-2 text-white'>Login</Link>
     </Form.Group>
    </Form>
   </Container>
  )
}

export default Register