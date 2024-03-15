const PORT=5000;

function getProducts() {
  return fetch(`http://localhost:${PORT}/queries/products`).then(res=>res.json())

}

function postData(obj){
  console.log(obj);
 return fetch(`http://localhost:${PORT}/queries/products`,{
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
    return fetch(`http://localhost:${PORT}/queries/products/${id}`,{
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
    return fetch(`http://localhost:${PORT}/queries/products/${id}`,{
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
    return fetch(`http://localhost:${PORT}/queries/products/${id}`)
    .then(response=>response.json())
    .catch(err=>console.log(err))
   }

   function getCategoryList(){
      return fetch(`http://localhost:${PORT}/queries/categories`)
      .then(res => res.json())
      .catch(err => {
        console.log("Error: ", err);
      });
   }


   export {getProductById,getProducts,postData,editProduct,deleteProduct,getCategoryList}