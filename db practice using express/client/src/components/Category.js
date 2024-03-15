import React from 'react'
import { Container } from 'react-bootstrap'

function Category({categories,addCategoryHandler}) {
  return (

   <Container className='m-0 p-0'>

<Container fluid className='m-0 bg-dark sticky-top'>
   
   <h3 className="text-center text-white">Enter Category Details</h3>
   <form className="text-center">
       <div className="row">
         <div className="form-group col">
           <input type="text" className="form-control mb-3" id="category-name" placeholder="Enter Category Name" required/>
         </div>

         <div className="input-group col" >
         <input type="text" className="form-control mb-3" id="description" placeholder="Enter Category escription" required/>
       </div>
       </div>
     
       <div className="row">
           <div className="form-group col">
           <button type="submit" className="btn btn-block add btn-info p-2 mb-2" onClick={addCategoryHandler}>Add Category</button>
            </div>     
       </div>
       
     </form>
</Container>
   <table className="table m-0 text-left">
   <thead className='sticky-top'>
     <tr>
       <th scope="col">Category ID</th>
       <th scope="col">Category</th>
       <th scope="col">Description</th>
       <th scope="col">Edit</th>
       <th scope="col">Delete</th>
     </tr>
   </thead>
   <tbody id="rows">
    {
       
       categories.map(category=>{
        return  ( <tr key={category.category_id}><td>{category.category_id}</td><td>{category.category}</td><td>{category.description}</td><td><button className='btn edit btn-warning' data-toggle="modal" data-target="#editModal" >Edit</button></td><td><button className='btn delete btn-danger'>Delete</button></td></tr>)
       })
    }
   </tbody>
 </table>

   </Container>

    )
}

export default Category