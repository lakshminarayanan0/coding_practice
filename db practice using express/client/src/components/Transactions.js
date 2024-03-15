import React from 'react'
import {Button, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Transactions({transactions,customers,getCustomerInfo}) {
  
  return (
  <Container className='m-0 p-0'>

<Container fluid className='m-0 bg-dark sticky-top'>
   
   <h3 className="text-center text-white">Enter Phone number to get details</h3>
   <form className="text-center">
       <div className="row">
         <div className="input-group col">
       <input type="tel" id='phoneToFind'  className="form-control mb-3"  placeholder='Enter Phone Number'/>
          </div>

         <div className="input-group col" >
          <Link to='/customer+info+to+add+purchase+details'>
         <Button variant='success'  className="form-control mb-3" onClick={getCustomerInfo} >Get customer Details</Button>
         </Link>
         </div>
       </div>

     </form>
</Container>

  <table className="table m-0 text-left">
    <thead className='sticky-top'>
      <tr>
        <th scope="col">Transaction ID</th>
        <th scope="col">Customer ID</th>
        <th scope='col'>First Name</th>
        <th scope='col'>Last Name</th>
        <th scope="col">Total Purchase</th>
        <th scope="col">Date of Purchase</th>
      </tr>
    </thead>
    <tbody id="rows">
     {
        
        transactions.map(transaction=>{
         return  ( <tr key={transaction.transaction_id}><td>{transaction.transaction_id}</td><td>{transaction.customer_id}</td><td>{transaction.first_name}</td><td>{transaction.last_name}</td><td>{transaction.total_amount}</td><td>{transaction.transaction_date}</td></tr>)
        })
     }
    </tbody>
  </table>
  </Container>
    )
}

export default Transactions