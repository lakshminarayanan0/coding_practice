import { getProducts,postData,deleteProduct,editProduct,getProductById, getCategoryList } from "./requests.js";

// hide header (add product) when scroll down

let prevScrollPos = window.pageYOffset;
const header = document.querySelector('.add-product');
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {

    header.style.top = '0';
  } else {

    header.style.top = '-200px'; 
  }

  prevScrollPos = currentScrollPos;
};


//fetch data onload
document.addEventListener('DOMContentLoaded', () => {
  getCategories('category')
  .then(()=>displayProducts())
  .then(()=>{
    document.getElementById('rows').addEventListener('click', (e) => {
      const target = e.target;
      
      if (target.classList.contains('delete')) {
        deleteHandler(target);
      } else if (target.classList.contains('edit')) {
        editHandler(target);
      }
    });
  });
});


//fetch categories list from db and add it to ui
function getCategories(categoryListID) {
  
    const categoryList = document.getElementById(categoryListID);
  return  getCategoryList().then((data)=>{
      data.forEach(category => {
        const option = document.createElement("option");
        option.value = category.category_id;
        option.innerHTML = category.category;
        categoryList.appendChild(option);
      });
    })
  };


  // displays available products from db
 function displayProducts() {

    getProducts()
    .then((data)=>{
    const tableRow = document.getElementById('rows');
    tableRow.innerHTML = '';

   if(data){
    if (data.length > 0) {
      data.forEach(product => {
        const newRow = document.createElement('tr');
        newRow.classList.add('entry');
        newRow.setAttribute('data-product-id',product.product_id)
        newRow.innerHTML += createRow(product);
        tableRow.appendChild(newRow);
      });
    } else {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `<td colspan="4" class="d-flex justify-content-center">No Products found</td>`;
      tableRow.appendChild(newRow);
    }
   }else{
    const newRow = document.createElement('tr');
      newRow.innerHTML = `<td colspan="4" class="d-flex justify-content-center">Error Fetching Data</td>`;
      tableRow.appendChild(newRow);
   }
  })
  .catch((error) => console.error(error));

}

// handling delete event

const deleteHandler= (target)=>{
  const element=target.parentNode.parentNode
  const productId=parseInt(element.getAttribute('data-product-id'));

  deleteProduct(productId)
  .then(isDeleted=>{
    // console.log(isDeleted);
  if(isDeleted){
    // console.log(isDeleted);

    alert('Product with id: '+productId+' deleted successfully');
    element.remove()
  }else{
    // console.log(isDeleted)
    alert('Failed to delete product');
  }
  document.getElementById('rows').removeEventListener('click', (e)=>deleteHandler(e));
})
.catch(err=>console.log(err))
}

//handling edit event

const editHandler = (target) => {
  const element = target.parentNode.parentNode;
  const productId = parseInt(element.getAttribute('data-product-id'));
  getProductById(productId).then(productData=>{

    getCategories('edit-category').then(() => {
      populateForm(productData);
  
      const saveBtn = document.querySelector('.save');
      function saveHandler(e) {
        e.preventDefault();
  
        const name = document.getElementById('edit-product-name');
        const category = document.getElementById('edit-category');
        const stock = document.getElementById('edit-stock');
        const price = document.getElementById('edit-price');
  
        const formData = {
          name: name.value,
          category: parseInt(category.value),
          stock: parseInt(stock.value),
          price: parseFloat(price.value),
        };
  
        editProduct(productId, formData)
        .then(editedProduct=>{
          if (editedProduct) {
            alert('Product with ' + productId + ' edited successfully');
            const editedRow = document.querySelector(`[data-product-id="${productId}"]`);
            console.log(editedProduct);
            editedRow.innerHTML = createRow(editedProduct);

          } else {
            alert('Failed to edit product');
          }
       
          removeEventHandler()
        })
       
      }
      
      const cancelBtn=document.getElementById('cancel')
      
      saveBtn.addEventListener('click', saveHandler);
      cancelBtn.addEventListener('click',removeEventHandler)
  
      function removeEventHandler() {
        const cancelBtn=document.getElementById('cancel')
        saveBtn.removeEventListener('click', saveHandler);
        cancelBtn.removeEventListener('click', removeEventHandler);
        document.getElementById('rows').removeEventListener('click', editHandler);
        $('#editModal').modal('hide');
        clearModalForm();
      }
    });
   })
   .catch(err=>{
    console.log(err)
    alert('Failed to edit product');
  })

};


//edit form populating

function populateForm(obj){
  // console.log(obj);
     const name= document.getElementById('edit-product-name');
     const category=document.getElementById('edit-category');
     const stock=document.getElementById('edit-stock');
     const price=document.getElementById('edit-price');

     name.value=obj.name;
     category.value=obj.category_id;
     stock.value=obj.stock_quantity;
     price.value=obj.price;

}

//clear edit form
function clearModalForm(){
  const name= document.getElementById('edit-product-name');
  const category=document.getElementById('edit-category');
  const stock=document.getElementById('edit-stock');
  const price=document.getElementById('edit-price');

  name.value="";
  category.value='';
  stock.value='';
  price.value='';

}

//handling posting product

const addBtn=document.querySelector('.add');
addBtn.addEventListener('click',addProduct)

//clears inputfields in post form
function clearInputFields(){
  const productName=document.getElementById('product-name');
  const productCategory=document.getElementById('category');
  const price=document.getElementById('price');
  const stockQuantity=document.getElementById('stock')

  productName.value=''
  productCategory.value=''
  price.value=''
  stockQuantity.value=''
}

//function to post product
function addProduct(e){
  e.preventDefault();
  const productName=document.getElementById('product-name');
  const productCategory=document.getElementById('category');
  const price=document.getElementById('price');
  const stockQuantity=document.getElementById('stock')

  if(!productName.value || !productCategory.value || !price.value || !stockQuantity.value){
    alert('All fields are required');

  }else{
    let newEntry={
      name:productName.value,
      category:parseInt(productCategory.value),
      price:parseFloat(price.value),
      stock:parseInt(stockQuantity.value)
    }
  postData(newEntry)
  .then(addedProduct=>{
    if(addedProduct){
      alert('Product added successfully');
      const rows=document.getElementById('rows');
      rows.innerHTML+=createRow(addedProduct)
    }else{
      alert('Failed to add product');

    }
    clearInputFields()
    displayProducts()
  })  
  }
}

//creating rows for new entry
   function createRow(product){
    return `<td>${product.product_id}</td><td>${product.name}</td><td>${product.category}</td><td>${product.stock_quantity}</td><td>${product.price}</td><td><button class='btn edit btn-warning' data-toggle="modal" data-target="#editModal" >Edit</button></td><td><button class='btn delete btn-danger'>Delete</button></td>`
   }