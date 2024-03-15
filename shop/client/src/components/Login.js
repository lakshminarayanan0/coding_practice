import React from 'react'
import { Container, Form ,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Login({handleChange,credentials,handleLogin}) {
  return (
   <Container fluid className='d-flex justify-content-center align-items-center bg-dark text-white flex-column' style={{minHeight:'100vh'}}>
   <h2>User Login</h2>

    <Form className='border p-3 text-white'>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" name='username' value={credentials.username} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={credentials.password} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Link to='/dashboard'>
      <Button variant="primary" type="submit" onClick={handleLogin}>
        Login
      </Button>
      </Link>
     
     <Form.Group>
     <Form.Text className='muted text-white'>Not a user?</Form.Text><Link to='/register' className=' ms-2 text-white'>Register</Link>
     </Form.Group>
    </Form>
   </Container>
  )
}

export default Login