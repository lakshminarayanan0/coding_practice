const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function userChoice() {
  let choice = -1;

   function askUser() {
    rl.question(
      "\n1. most sold products this month \n2. most sales by customers this month \n3. revenue generated by electronics this month \n4. products sold over 500 this month (quantity) \n5. customers purchased over 50000 this month \n6. Top sales today \n7. unsold products this month \n0. LogOut\n\nEnter your choice: ",
       (userInput) => {
        choice = userInput;
        handleUserChoice();
      }
    );
  }

   function handleUserChoice() {
    switch (choice) {
      case '1':
        mostSold();
        askUser();
        break;
      case '2':
        topSalesByCust();
        askUser();
        break;
      case '3':
        electronics();
        askUser();
        break;
      case '4':
        soldOver500();
        askUser();
        break;
      case '5':
        salesOver50000();
        askUser();
        break;
      case '6':
        topsalesToday();
        askUser();
        break;
      case '7':
        getUnsold();
        askUser();
        break;
      case '0':
        logout();
        rl.close();
        break;
      default:
        console.log("Enter a valid choice.");
        askUser();
        break;
    }
  }

  askUser();
}





function getUnsold(){
    fetch('http://localhost:8000/unsold')
    .then(prod=>prod.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err.message))
}

function mostSold(){
    fetch('http://localhost:8000/mostsold')
    .then(prod=>prod.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err.message))
}

function topsalesToday(){
    fetch('http://localhost:8000/topsalestoday')
    .then(prod=>prod.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err.message))
}

function electronics(){
    fetch('http://localhost:8000/electronics')
    .then(prod=>prod.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err.message))
}

function topSalesByCust(){
    fetch('http://localhost:8000/topsalesbycustomer')
    .then(prod=>prod.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err.message))
}

function soldOver500(){
    fetch('http://localhost:8000/over500')
    .then(prod=>prod.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err.message))
}

function salesOver50000(){
    fetch('http://localhost:8000/over50000')
    .then(prod=>prod.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err.message))
}

function logout(){
  fetch('http://localhost:8000/logout')
  .then(prod=>prod.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err.message))
}

module.exports={
    salesOver50000,
    soldOver500,
    getUnsold,
    mostSold,
    topSalesByCust,
    electronics,
    topsalesToday,
    userChoice
}