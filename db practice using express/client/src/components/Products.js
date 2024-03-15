import React from 'react'
import { Container } from 'react-bootstrap'

function Products({products,categories,addProductHandler}) {

  return (
   <Container fluid className='m-0 p-0'>
    <Container fluid className='m-0 bg-dark sticky-top'>
   
        <h3 className="text-center text-white">Enter Product Details</h3>
        <form className="text-center">
            <div className="row">
              <div className="form-group col">
                <input type="text" className="form-control mb-3" id="product-name" placeholder="Enter Product Name" required/>
              </div>

              <div className="input-group col" >
                <select defaultValue={0} className="custom-select mb-3" style={{width:'100%'}} id="category" name="category" required>
                  <option disabled value={0}>Choose category</option>
                  {
                    categories.map(category=>{
                      return(
                      <option key={category.category_id} value={category.category_id}>{category.category}</option>
                      );
                    })
                  }
                </select>
              </div>
            </div>
          
            <div className="row">
                <div className="form-group col">
                    <input type="number" className="form-control mb-3" id="price" placeholder="Enter price of product (in Rs)" required/>
                  </div>
                  <div className="form-group col">
                    <input type="number" className="form-control mb-3" id="stock" placeholder="Enter available stocks" required/>
                  </div>
            </div>
            
            <button type="submit" className="btn btn-block add btn-info p-2 mb-2" onClick={addProductHandler}>Add Product</button>
          </form>
    </Container>
     <table className="table m-0 text-left">
                    <thead className='sticky-top'>
                      <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Stock Quantity</th>
                        <th scope="col">Price in Rs.</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody id="rows">
                     {
                        
                        products.map(product=>{
                         return  ( <tr key={product.product_id}><td>{product.product_id}</td><td>{product.name}</td><td>{product.category}</td><td>{product.stock_quantity}</td><td>{product.price}</td><td><button className='btn edit btn-warning' data-toggle="modal" data-target="#editModal" >Edit</button></td><td><button className='btn delete btn-danger'>Delete</button></td></tr>)
                        })
                     }
                    </tbody>
                  </table>
   </Container>

  )
}

export default Products