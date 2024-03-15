import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Filters({mostSalesByCustomerThisMonth,mostSalesByCustomerThisMonthOver50000,mostSoldProductsThisMonth,mostSoldProductsThisMonthOver500,revenueFromElectronicsThisMonth,topSalesToday,unsoldProductsThisMonth}) {
  return (
<Container className='container-fluid p-0 mb-3 sticky-top d-flex flex-column bg-secondary' style={{overflowY:'scroll'}}>
<Link to='/most+sold+products+this+month'
 data-action='most-sold-products-this-month'
  onClick={mostSoldProductsThisMonth}
 className='m-2 text-white'
 style={{textDecoration:'none'}}>
Most sold Products This Month
</Link>

<Link to='/most+sold+products+over+500+this+month'
 data-action='most-sold-products-this-month-over-500'
 onClick={mostSoldProductsThisMonthOver500}
 className='m-2 text-white'
 style={{textDecoration:'none'}}>
     Products sold over 500 This Month
</Link>

<Link to='/revenue+from+electronics+this+month'
 data-action='revenue-from-electronics-this-month'
 onClick={revenueFromElectronicsThisMonth}
 className='m-2 text-white'
 style={{textDecoration:'none'}}>
     Revenue from electronics products this month
</Link>

<Link to='/top+sales+today'
 data-action='top-sales-today'
 onClick={topSalesToday}
 className='m-2 text-white'
 style={{textDecoration:'none'}}>
    Today top sales
</Link>

<Link to='/most+sales+by+customers+this+month'
 data-action='most-sales-by-customers-this-month'
 onClick={mostSalesByCustomerThisMonth}
 className='m-2 text-white'
 style={{textDecoration:'none'}}>
    Most sales by customer this month
</Link>

<Link to='/most+sales+by+customers+this+month+over+50000'
 data-action='most-sales-by-customers-this-month-over-50000'
 onClick={mostSalesByCustomerThisMonthOver50000}
 className='m-2 text-white'
 style={{textDecoration:'none'}}>
    Most sales by customer this month over 50000
</Link>

<Link to='/unsold+products+this+month'
 data-action='unsold-products-this-month'
 onClick={unsoldProductsThisMonth}
 className='m-2 text-white'
 style={{textDecoration:'none'}}>
   Unsold products this month
</Link>

</Container> 
 )
}

export default Filters