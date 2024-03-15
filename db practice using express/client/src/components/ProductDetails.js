import React from 'react'
import { ListGroup } from 'react-bootstrap'

function ProductDetails({item}) {
  return (

           <ListGroup key={item.product_id} variant="info">
              <ListGroup.Item>Product ID: {item.product_id}</ListGroup.Item>
              <ListGroup.Item>Product: {item.Product ? item.Product.name : 'N/A'}</ListGroup.Item>
              <ListGroup.Item>Quantity: {item.quantity}</ListGroup.Item>
              <ListGroup.Item>Price: Rs.{item.subtotal}</ListGroup.Item>
            </ListGroup>
    )
}

export default ProductDetails