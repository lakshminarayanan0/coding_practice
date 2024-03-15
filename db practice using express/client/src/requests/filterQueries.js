const PORT=5000


function mostSoldProductsThisMonth(){
    return fetch(`http://localhost:${PORT}/filters/mostsold`).then(res=>res.json())
}

function mostSoldProductsThisMonthOver500(){
    return fetch(`http://localhost:${PORT}/filters/over500`).then(res=>res.json())
}

function revenueFromElectronicsThisMonth(){
    return fetch(`http://localhost:${PORT}/filters/electronicsrev`).then(res=>res.json())
}

function topSalesToday(){
    return fetch(`http://localhost:${PORT}/filters/topsalestoday`).then(res=>res.json())
}

function mostSalesByCustomerThisMonth(){
    return fetch(`http://localhost:${PORT}/filters/topsalesthismonth`).then(res=>res.json())
}

function mostSalesByCustomerThisMonthOver50000(){
    return fetch(`http://localhost:${PORT}/filters/over50000`).then(res=>res.json())
}

function unsoldProductsThisMonth(){
    return fetch(`http://localhost:${PORT}/filters/unsold`).then(res=>res.json())
}


export {
    unsoldProductsThisMonth,
    mostSalesByCustomerThisMonth,
    mostSalesByCustomerThisMonthOver50000,
    mostSoldProductsThisMonthOver500,
    revenueFromElectronicsThisMonth,
    topSalesToday,
    mostSoldProductsThisMonth
}