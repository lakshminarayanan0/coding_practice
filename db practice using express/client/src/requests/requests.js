const PORT=5000;

function getProducts() {
  return fetch(`http://localhost:${PORT}/products`).then(res=>res.json())

}

function getCustomersList(){
    return fetch(`http://localhost:${PORT}/customers`).then(res=>res.json())
}

function getTransactions(){
    return fetch(`http://localhost:${PORT}/transactions`).then(res=>res.json())
}

function postData(obj){
  console.log(obj);
 return fetch(`http://localhost:${PORT}/products`,{
    method:'POST',
    headers:{
    "Content-Type":"Application/json"
    },
    body:JSON.stringify(obj)
  })
  .then(response=>{

    if(response.status===200){
      console.log('Product added successfully');
      return response.json();
  
    }else{
      console.log('Failed to add product');
      return null;
    }
  
  })
  .catch(err=>console.log(err))
}

  
   function deleteProduct(id){
    return fetch(`http://localhost:${PORT}/products/${id}`,{
      method:'DELETE',
     headers:{
      "Content-Type":"Application/json"
     }
    })
    .then(response=>{
      if(response.status===200){
        console.log('Product with '+id+' deleted successfully');
      return true;
      }else{
        console.log('Failed to delete product');
        return false;
      }  
    })
   }

   function editProduct(id,editObj){
    return fetch(`http://localhost:${PORT}/products/${id}`,{
      method:'PUT',
     headers:{
      "Content-Type":"Application/json",
     },
     body:JSON.stringify(editObj)
    })
    .then(response=>{
      if(response.status===200){
        console.log('Product with '+id+' edited successfully');
      return response.json();
      }else{
        console.log('Failed to edit product');
        return false;
      }
    
    })
    .catch(err=>console.log(err))

   }

   function getProductById(id){
    return fetch(`http://localhost:${PORT}/products/${id}`)
    .then(response=>response.json())
    .catch(err=>console.log(err))
   }

   function getCategoryList(){
      return fetch(`http://localhost:${PORT}/categories`)
      .then(res => res.json())
      .catch(err => {
        console.log("Error: ", err);
      });
   }

   function postCategory(obj){
    console.log(obj);
    return fetch(`http://localhost:${PORT}/categories`,{
      method:'POST',
      headers:{
      "Content-Type":"Application/json"
      },
      body:JSON.stringify(obj)
    })
    .then(response=>{
  
      if(response.status===200){
        console.log('category added successfully');
        return response.json();
    
      }else{
        console.log('Failed to add category');
        return null;
      }
    
    })
    .catch(err=>console.log(err))
   }

   function postCustomer(obj){
    return fetch(`http://localhost:${PORT}/customers`,{
      method:'POST',
      headers:{
      "Content-Type":"Application/json"
      },
      body:JSON.stringify(obj)
    })
    .then(response=>{
  
      if(response.status===200){
        console.log('customer added successfully');
        return response.json();
    
      }else{
        console.log('Failed to add customer');
        return null;
      }
    
    })
    .catch(err=>console.log(err))
   }

   function getPurchaseDetailsByCustID(id){
    return fetch(`http://localhost:${PORT}/transactions/transactions/by/cust/id/${id}`)
           .then(res=>res.json())
   }

   export {getProductById,getProducts,postData,editProduct,deleteProduct,getCategoryList,getCustomersList,getTransactions,postCategory,postCustomer,getPurchaseDetailsByCustID}