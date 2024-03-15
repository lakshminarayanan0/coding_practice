import React from 'react'
import { Card, Container, ListGroup } from 'react-bootstrap'

function Dashboard({user}) {
  return (
    <Container>
        <h1>User DashBoard</h1>
        <h2>Welcome! {user.username}</h2>



    <Card style={{ width: '18rem' }}>
      <ListGroup variant="flush">
        <ListGroup.Item>Username: {user.username}</ListGroup.Item>
        <ListGroup.Item>Email: {user.email}</ListGroup.Item>
        <ListGroup.Item>Phone: {user.phone}</ListGroup.Item>
      </ListGroup>
    </Card>


    </Container>
  )
}

export default Dashboard