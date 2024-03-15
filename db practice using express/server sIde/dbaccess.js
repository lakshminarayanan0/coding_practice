const Pool = require('pg').Pool;
const queries=require('./queries')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:'billing',
    password:'Maha@2021',
    port:5432
});

const {
    getCustomersPurchasedMoreThan5000ThisMonth,
    getMostSoldProductsThisMonth,
    getTodayTopSales,
    getUnsoldProductsThisMonth,
    getProductsSoldOver500ThisMonth,
    getRevenueByElectronicsThisMonth,
    getTopSalesThisMonth
}=queries

rl.question('Enter the query number (1-7): ', (answer) => {
    const queryNumber = parseInt(answer);


if (queryNumber >= 1 && queryNumber <= 7) {
    switch(queryNumber){
        case 1:{
            getData(getTodayTopSales);
            break;
        }
        case 2:{
            getData(getTopSalesThisMonth);
            break;
        }
        case 3:{
            getData(getMostSoldProductsThisMonth);
            break;
        }
        case 4:{
            getData(getUnsoldProductsThisMonth);
            break;
        }
        case 5:{
            getData(getRevenueByElectronicsThisMonth);
            break;
        }
        case 6:{
            getData(getProductsSoldOver500ThisMonth);
            break;
        }
        case 7:{
            getData(getCustomersPurchasedMoreThan5000ThisMonth);
            break;
        }
    }
    
}else console.log("Enter valid number")

})
rl.on('close', () => {
    process.exit(0);
  });

function getData(query){
    pool.query(query, (error, results) => {
        if (error) {
          console.log(error);
        } else {
          console.log(results.rows);
        }
      });



pool.end();


}


