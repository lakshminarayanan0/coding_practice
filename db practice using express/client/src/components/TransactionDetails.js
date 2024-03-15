import React from 'react'
import { Card } from 'react-bootstrap'
import ProductDetails from './ProductDetails'

function TransactionDetails({trans}) {
  return (
<Card key={trans.transaction_id}>
          <Card.Header className='d-flex justify-content-around'>
           <span> Transaction Id: {trans.transaction_id}</span> <span>Total Amount: Rs.{trans.total_amount}</span> <span>{trans.transaction_date}</span>
          </Card.Header>
          {trans.PurchaseDetails.map(item =><ProductDetails item={item}/>)}
        </Card> 
  ) 
}

export default TransactionDetails