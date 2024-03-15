import React, { useState, useEffect } from 'react';
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import { getPurchaseDetailsByCustID } from '../requests/requests';
import ProductDetails from './ProductDetails';
import TransactionDetails from './TransactionDetails';
import { Link } from 'react-router-dom';

function PurchaseDetails({ customer ,getProductsHandler}) {
  const [purchaseDetails, setPurchaseDetails] = useState([]);

  useEffect(() => {
    if (customer && customer.customer_id) {
      const { customer_id } = customer;
  
      // Fetch purchase details when the component mounts
      getPurchaseDetailsByCustID(customer_id)
        .then((data) => setPurchaseDetails(data))
        .catch((error) => console.error('Error fetching purchase details:', error));
    }
  }, [customer]);

  return (
    <Container className='m-0 p-0'>
      {customer && customer.customer_id ? 
      (
      
      <Card>
        <Card.Header>Customer Information</Card.Header>
        <Card.Body>
          <Card.Title>
            Customer Name: {customer.first_name} {customer.last_name}
          </Card.Title>
          <Card.Text>
            <ListGroup variant="info">
              <ListGroup.Item>Customer ID: {customer.customer_id}</ListGroup.Item>
              <ListGroup.Item>Phone Number: {customer.phone}</ListGroup.Item>
              <ListGroup.Item>Mail: {customer.mail}</ListGroup.Item>
              <ListGroup.Item>Address: {customer.address}</ListGroup.Item>
            </ListGroup>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
        <Button>Add your recent purchase</Button>
        </Card.Footer>
      </Card>
          
      )  
      : 
      (<Container>
        <div>No users found with the phone number you entered!.</div>
         <Link to='/new+customer'>
         <Button onClick={getProductsHandler}>Create New User</Button>
         </Link>
      </Container>
      )
}
    
    {purchaseDetails.map(trans => <TransactionDetails trans={trans}/>)}
    </Container>
  );
}

export default PurchaseDetails;
