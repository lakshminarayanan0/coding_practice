import React from 'react';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Filters from './Filters';

function Sidebar({products,categories,customers,transactions,mostSalesByCustomerThisMonth,mostSalesByCustomerThisMonthOver50000,mostSoldProductsThisMonth,mostSoldProductsThisMonthOver500,revenueFromElectronicsThisMonth,topSalesToday,unsoldProductsThisMonth}) {


  return (
    <Container className='container-fluid p-0 sticky-top d-flex flex-column bg-secondary' style={{height:'100vh'}}>
     <Container className='container-fluid p-0 mb-3 sticky-top d-flex flex-column bg-secondary' >
     <Link 
      to='/products'
        data-action='Products'
        onClick={products}
        className='m-2 text-white'
        style={{textDecoration:'none'}}>
        Products
      </Link>

      <Link 
      to="/customers"
      data-action='Customers'
        onClick={customers}
        className='m-2 text-white'
        style={{textDecoration:'none'}}>
        Customers
      </Link>

      <Link to='/categories'
       data-action='Categories'
       onClick={categories}
       className='m-2 text-white'
       style={{textDecoration:'none'}}>
        Categories
      </Link>

      <Link to='/transactions'
         variant='success'
         data-action='Transactions'
         onClick={transactions}
         className='m-2 text-white'
         style={{textDecoration:'none'}}>
        Transactions
      </Link>
     </Container>
      <h4 className='text-white p-3'>Filters</h4>
      <Filters 
      mostSalesByCustomerThisMonth={mostSalesByCustomerThisMonth}
      mostSalesByCustomerThisMonthOver50000={mostSalesByCustomerThisMonthOver50000}
      mostSoldProductsThisMonth={mostSoldProductsThisMonth}
      mostSoldProductsThisMonthOver500={mostSoldProductsThisMonthOver500}
      revenueFromElectronicsThisMonth={revenueFromElectronicsThisMonth}
      topSalesToday={topSalesToday}
      unsoldProductsThisMonth={unsoldProductsThisMonth}/>
    </Container>
  );
}

export default Sidebar;
