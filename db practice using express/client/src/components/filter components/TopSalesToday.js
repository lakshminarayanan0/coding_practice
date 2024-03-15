import React from 'react'

function TopSalesToday({customers}) {
    console.log(customers);
  return (
    <table className="table m-0 text-left">
    <thead className='sticky-top'>
      <tr>
        <th scope="col">Transaction ID</th>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Total purchased</th>

      </tr>
    </thead>
    <tbody id="rows">
     {
        
        customers.map(customer=>{
         return  ( <tr key={customer.transaction_id}><td>{customer.transaction_id}</td><td>{customer.first_name}</td><td>{customer.last_name}</td><td>{customer.total_amount}</td></tr>)
        })
     }
    </tbody>
  </table>   )
}

export default TopSalesToday