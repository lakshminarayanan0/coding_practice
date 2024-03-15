import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { Col, Container, Row } from 'react-bootstrap';
import MainContainer from './components/MainContainer';
import { getCategoryList, getProducts, getTransactions, postCategory, postCustomer, postData } from './requests/requests';
import { getCustomersList } from './requests/requests';
import { Route, Routes } from 'react-router-dom';
import Products from './components/Products';
import Customers from './components/Customers';
import Category from './components/Category';
import Transactions from './components/Transactions';
import { mostSalesByCustomerThisMonth, mostSalesByCustomerThisMonthOver50000, mostSoldProductsThisMonth, mostSoldProductsThisMonthOver500, revenueFromElectronicsThisMonth, topSalesToday, unsoldProductsThisMonth } from './requests/filterQueries'
import UnsoldProducts from './components/filter components/UnsoldProducts';
import MostSoldProductsThisMonth from './components/filter components/MostSoldProductsThisMonth';
import MostSoldOver500 from './components/filter components/MostSoldOver500';
import RevenueByElectronics from './components/filter components/RevenueByElectronics';
import TopSalesToday from './components/filter components/TopSalesToday';
import MostSalesByCustomers from './components/filter components/MostSalesByCustomers';
import MostSalesByCustomersOver50000 from './components/filter components/MostSalesByCustomersOver50000';
import PurchaseDetails from './components/PurchaseDetails';
import NewUserPage from './components/NewUserPage';
import AddPurchases from './components/AddPurchases';


function App () {

  const [products,setProducts]=useState([]);
  const [categories,setCategories]=useState([]);
  const [customers,setCustomers]=useState([]);
  const [transactions,setTransaction]=useState([]);
  const [customerInfo,setCustomerInfo]=useState({})
  const [phoneNumber,setPhoneNumber]=useState(0)

  //states for filters
  const [mostSalesTM,setMostSalesTM]=useState([]);
  const [topSalesTday,setTopSalesToday]=useState([]);
  const [salesOver50000,setSalesOver50000]=useState([]);
  const [unsold,setUnsold]=useState([]);
  const [soldOver500,setSoldOver500]=useState([]);
  const [mostSoldTM,setMostSoldTM]=useState([]);
  const [revByElecTM,setRevByElecTM]=useState([])


  //functions to handle filters

 function mostSalesByCustomerThisMonthHandler(){
  mostSalesByCustomerThisMonth().then(customers=>setMostSalesTM(customers))
 }

function mostSalesByCustomerThisMonthOver50000Handler(){
  mostSalesByCustomerThisMonthOver50000().then(customers=>setSalesOver50000(customers))
}

function mostSoldProductsThisMonthHandler(){
  mostSoldProductsThisMonth().then(products=>setMostSoldTM(products))

}


function mostSoldProductsThisMonthOver500Handler(){
  mostSoldProductsThisMonthOver500().then(products=>{
    setSoldOver500(products)
  })
  
}

function revenueFromElectronicsThisMonthHandler(){
  revenueFromElectronicsThisMonth().then(products=>setRevByElecTM(products))
  
}

function topSalesTodayHandler(){
  topSalesToday().then(customers=>{
    setTopSalesToday(customers)
  })
}

function unsoldProductsThisMonthHandler(){
  unsoldProductsThisMonth().then(products=>setUnsold(products))
}
  // useEffect(()=>{
  //   console.log('transactions: ',transactions)
  // },[transactions])
    
  function getProductsHandler(){
    getProducts().then(data=>{
      setProducts(data);
      
    })

    getCategoryList().then(data=>{
      setCategories(data);
      
    })
  }
  
  function addProductHandler(e){
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
      console.log(addedProduct);
      setProducts([...products,addedProduct])


      productName.value = '';
      productCategory.value = 0;
      price.value = '';
      stockQuantity.value = '';

     
    }else{
      alert('Failed to add product');

    }
   })
   }
  }

  function addCategoryHandler(e){
     e.preventDefault();
     const category=document.getElementById('category-name');
     const description=document.getElementById('description');

     if(!category.value || !description.value){
      alert('All fields are required');
     }
     
     const newCategory={
      category:category.value,
      description:description.value
     }

     postCategory(newCategory)
     .then(addedCategory=>{
      if(!addedCategory){
      alert("Failed to add category")
      }
      alert("category added  successfully")
      setCategories([...categories,addedCategory])
     })
  }

  function addCustomerHandler(e){
    e.preventDefault();
    const first=document.getElementById('first-name');
    const last=document.getElementById('last-name');
    const mail=document.getElementById('mail')
    const phone=document.getElementById('phoneNumber')
    const address=document.getElementById('address');
    phone.value=parseInt(phoneNumber)

    if(!first.value || !last.value || !mail || !phone || !address){
     alert('All fields are required');
    }
    
    const newCustomer={
     first_name:first.value,
     last_name:last.value,
     phone:phone.value,
     mail:mail.value,
     address:address.value
    }

    postCustomer(newCustomer)
    .then(addedCustomer=>{
     if(!addedCustomer){
     alert("Failed to add Customer")
     }
     alert("Customer added  successfully")
     setCustomers([...customers,addedCustomer])
    })

    getCustomerInfoUsingPhone(phone.value)
    first.value=''
    last.value=''
    mail.value=''
    phone.value=''
    address.value=''

   
 }


  function getCategoriesHandler(){
    getCategoryList().then(data=>{
      setCategories(data);
      
    })
  }

  function getCustomersHandler(){
    getCustomersList().then(data=>{
      setCustomers(data);
      
    })
  }

  function getTransactionsHandler(){
    getTransactions().then(data=>{
      setTransaction(data);

      getCustomersList().then(data=>{
        setCustomers(data);
      
    })
  })
  }


  function  getCustomerInfo(){
   const phone=document.getElementById('phoneToFind');
   setCustomerInfo({})
   setPhoneNumber(phone.value)
   customers.map(customer=>{
     if(customer.phone===phone.value+''){
      setCustomerInfo(customer);
     }else{
      return {}
     }
   })
   
  }

  function getCustomerInfoUsingPhone(phone){
    setPhoneNumber(phone)
    customers.map(customer=>{
      if(customer.phone===phone+''){
       setCustomerInfo(customer);
      }else{
       return {}
      }
    })
  }
  
  

    return (
     
       <Container fluid className="App">
      <Row>
     <Col className="col-2 p-0">
    <Sidebar 
     products={getProductsHandler} 
     categories={getCategoriesHandler}
     customers={getCustomersHandler}
     transactions={getTransactionsHandler}
     mostSalesByCustomerThisMonth={mostSalesByCustomerThisMonthHandler}
     mostSalesByCustomerThisMonthOver50000={mostSalesByCustomerThisMonthOver50000Handler}
     mostSoldProductsThisMonth={mostSoldProductsThisMonthHandler}
     mostSoldProductsThisMonthOver500={mostSoldProductsThisMonthOver500Handler}
     revenueFromElectronicsThisMonth={revenueFromElectronicsThisMonthHandler}
     topSalesToday={topSalesTodayHandler}
     unsoldProductsThisMonth={unsoldProductsThisMonthHandler}
     />
     </Col>
     
    
     <Col className="col-10 p-0">
     <Container className='bg-white p-0 ' style={{minHeight:'100vh',borderLeft:'1px solid white',overflowX:'scroll'}}>
     <Routes>
     <Route path='/' element={<MainContainer/>}/>
     <Route path='/products' element={<Products products={products} categories={categories} addProductHandler={addProductHandler}/>} />
     <Route path='/customers' element={<Customers customers={customers} />} />
     <Route path='/categories' element={<Category categories={categories} addCategoryHandler={addCategoryHandler}/>} />
     <Route path='/transactions' element={<Transactions transactions={transactions} customers={customers} getCustomerInfo={getCustomerInfo}/>} />
     <Route path='/unsold+products+this+month' element={<UnsoldProducts products={unsold}/>}/>
     <Route path='/most+sold+products+this+month' element={<MostSoldProductsThisMonth products={mostSoldTM}/>}/>
     <Route path='/most+sold+products+over+500+this+month' element={<MostSoldOver500 products={soldOver500}/>}/>
     <Route path='/revenue+from+electronics+this+month' element={<RevenueByElectronics products={revByElecTM}/>}/>
     <Route path='/top+sales+today' element={<TopSalesToday customers={topSalesTday}/>}/>
     <Route path='/most+sales+by+customers+this+month' element={<MostSalesByCustomers customers={mostSalesTM}/>}/>
     <Route path='/most+sales+by+customers+this+month+over+50000' element={<MostSalesByCustomersOver50000 customers={salesOver50000}/>}/>
     <Route path='/customer+info+to+add+purchase+details' element={<PurchaseDetails customer={customerInfo} getProductsHandler={getProductsHandler}/>}/>
     <Route path='/new+customer' element={<NewUserPage addCustomerHandler={addCustomerHandler} phone={phoneNumber} products={products}/>}/>
     <Route path='/add+purchases' element={<PurchaseDetails customer={customerInfo} />}/>


     
     </Routes>
   
     </Container>
      {/* <MainContainer data={{products,customers,categories,transactions}}/> */}
      </Col>
      </Row>
      </Container>
  
    );
  }


export default App;
