import React from 'react'

function UnsoldProducts({products}) {
  return (
    <table className="table m-0 text-left">
    <thead className='sticky-top'>
      <tr>
        <th scope="col">Product ID</th>
        <th scope="col">Product Name</th>
        <th scope="col">Category</th>
      </tr>
    </thead>
    <tbody id="rows">
     {
        
        products.map(product=>{
         return  ( <tr key={product.product_id}><td>{product.product_id}</td><td>{product.name}</td><td>{product.category}</td></tr>)
        })
     }
    </tbody>
  </table>

  )
}

export default UnsoldProducts