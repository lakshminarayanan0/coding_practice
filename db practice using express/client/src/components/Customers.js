import React from 'react'
import { Container } from 'react-bootstrap'

function Customers({customers,addCustomerHandler}) {

  return (
    <Container fluid className='m-0 p-0'>



<table className="table m-0 text-left" style={{fontSize:'15px'}}>
    <thead className='sticky-top'>
      <tr>
        <th scope="col">Customer ID</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Phone</th>
        <th scope="col">Mail</th>
        <th scope="col">Address</th>
        <th scope="col">Edit</th>

      </tr>
    </thead>
    <tbody id="rows"  style={{fontSize:'15px'}}>
     {
        
        customers.map(customer=>{
         return  ( <tr key={customer.customer_id}><td>{customer.customer_id}</td><td>{customer.first_name}</td><td>{customer.last_name}</td><td>{customer.phone}</td><td>{customer.mail}</td><td>{customer.address}</td><td><button className='btn edit btn-warning' data-toggle="modal" data-target="#editModal" >Edit</button></td></tr>)
        })
     }
    </tbody>
  </table>

      </Container>


  )
}

export default Customers