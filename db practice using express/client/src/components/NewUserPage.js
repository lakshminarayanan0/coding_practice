import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NewUserPage({phone,addCustomerHandler,products}) {
    // console.log(phone);
  return (
    <Container fluid className='m-0 bg-dark sticky-top'>
   
    <h3 className="text-center text-white">Enter Customer Details</h3>
    <form className="text-center">
        <div className="row">
          <div className="form-group col">
            <input type="text" className="form-control mb-3" id="first-name" placeholder="Enter First Name" required/>
          </div>
 
          <div className="input-group col" >
          <input type="text" className="form-control mb-3" id="last-name" placeholder="Enter Last Name" required/>
          </div>
        </div>
      
        <div className="row">
            <div className="form-group col">
                <input type="tel" className="form-control mb-3" id="phoneNumber" placeholder="Enter Phone Number" value={phone} onChange={(e)=>e.target.value} required/>
              </div>
              <div className="form-group col">
                <input type="email" className="form-control mb-3" id="mail" placeholder="Enter Mail " required/>
              </div>
        </div>
 
        <div className="row">
            <div className="form-group col">
                <input type="text" className="form-control mb-3" id="address" placeholder="Enter Address" required/>
              </div>
              {/* <div className="form-group col"> */}
                {/* <Link to='/add+purchases'>

              <button type="submit" style={{width:'100%'}} className="btn btn-block addCustomer btn-info p-2 mb-2" onClick={addCustomerHandler}>Add Details</button>
                </Link> */}
              {/* </div> */}
              
              <div className="form-group col" >
                <select defaultValue={0} className="form-control mb-3" style={{width:'100%'}} id="select-product" name="products" required>
                  <option disabled value={0}>Choose products</option>
                  {
                    products.map(product=>{
                      return(
                      <option key={product.product_id} value={product.product_id}>{product.name}</option>
                      );
                    })
                  }
                </select>
              </div>
              </div>
              <div className="row">
              <div className="form-group col">
                <input type="number" className="form-control mb-3" id="buy-quantity" placeholder="Enter quantity" required/>
              </div>
              <div className="form-group col">
                <input type="number" className="form-control mb-3" id="subtotal-price" placeholder="price" readOnly/>
              </div>
              </div>
              <div className="row">
              <div className="form-group col">
                <Button className='form-control mb-3'>Add</Button>
              </div>
              </div>
        
      </form>
 </Container>
  )
}

export default NewUserPage